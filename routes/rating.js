
const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const User = require('../models').User
const Rating = require('../models').Rating
const Feedback = require('../models').Feedback

router

    //
    //
    // @endpoint {POST} /rating
    //
    // @body  {String} rater_id    - ID of the user posting the new rating.
    // @body  {String} ratee_id    - ID of the user being rated.
    // @body  {Int}    rating      - Rating must be a real number between from 0 to 5.
    // @body  {String} description -
    //
    .post('/', (req, res, next) => {
        const rater_id    = req.body.rater_id
        const ratee_id    = req.body.ratee_id
        const rating      = req.body.rating
        const description = req.body.description
        return Rating.create({
                rater_id    : rater_id,
                ratee_id    : ratee_id,
                rating      : rating,
                description : description
            })
            .then( rating => {
                return Rating.serialize(rating)
            })
            .then( serializedData => {
                res.status(201).json(serializedData)
            })
            .catch( error => {
                console.log('POST /rating/'+ratee_id+'/ratings - error occured while adding a new rating: ' + JSON.stringify({
                    rater_id: rater_id,
                    ratee_id: ratee_id,
                    rating: rating,
                    description: description
                }))
                console.log('error: ' + error)
                res.status(500).send()
            })
    })

    //
    //
    // @endpoint {PUT} /rating/{rid}
    //
    // @param {String} rid -
    // @body  {String} uid -
    //
    .put('/:rid', (req, res, next) => {
        const uid = req.body.uid
        Rating.findOne({ where: { rid: req.params.rid } })
            .then( rating => {
                if (uid == rating.rater_id) {
                    return rating.updateAttributes({
                        description : req.body.description
                    })
                } else {
                    // TODO: -
                    return Promise.reject(new Error(''))
                }
            })
            .then( result => {
                res.status(200).json(result)
            })
            .catch( error => {
                console.log('PUT /rating/'+req.params.rid+' - error while adding feedback for rating: ' + error)
                res.status(500).send()
            })
    })

    // Allows a user to provide feedback on a rating. A user can only provide one feedback per rating.
    // Increments the helpful or non-helpful count of the rating.
    //
    // @param {String}  rid       -
    // @body  {Boolean} ishelpful -
    .post('/:rid/helpfulness', (req,res,next) => {
        Feedback.incrementFor(req.params.rid, req.body.ishelpful)
            .then( result => {
                res.status(200).send()
            })
            .catch( error => {
                console.log('PUT /:rid/helpfullness - error while adding feedback for rating: ' + error)
                res.status(500).send()
            })
    })

    // Query a specific rating.
    //
    // @endpoint {GET} /rating/{rid}
    //
    // @param {String} rid - ID of the rating.
    //
    .get('/id/:rid?', (req, res, next) => {
        Rating.findOne({ where: { rid: req.params.rid } })
            .then( rating => {
                return Rating.serialize(rating)
            })
            .then( serializedData => {
                console.log('found rating: ' + JSON.stringify(serializedData))
                res.status(200).json(serializedData)
            })
            .catch( error => {
                console.log('GET /rating/:rid - error while getting rating: ' + req.params.rid + ' ' + error)
                res.status(500).send()
            })
    })

    // Query all ratings of a user.
    //
    // @endpoint {GET} /rating/all/{uid}
    //
    // @param {String} uid - ID of the user.
    //
    .get('/all/:uid', (req, res, next) => {
        Rating.findAll({
                where: {
                    ratee_id: req.params.uid
                }
            })
            .then( query => {
                return Promise.all(query.map( rating => {
                    return Rating.serialize(rating)
                }))
            })
            .then( query => {
                res.status(200).json(query)
            })
            .catch( error => {
                console.log('GET /rating/all/:uid - error while getting all ratings for user: ' + req.params.uid + ' ' + error)
                res.status(500).send()
            })
    })

    // Query recent ratings.
    //
    // @endpoint {GET} /rating/recent?limit?={limit}
    //
    // @param {String} uid - ID of the user.
    //
    .get('/recent/:limit?', (req, res, next) => {
        Rating.findAll({ limit: req.query.limit })
            .then( query => {
                return Promise.all(query.map( rating => {
                    return Rating.serialize(rating)
                }))
            })
            .then( query => {
                res.status(200).json(query)
            })
            .catch( error => {
                console.log('GET /rating/all/:uid - error while getting all ratings for user: ' + req.params.uid + ' ' + error)
                res.status(500).send()
            })
    })

    .post('/find', (req, res, next) => {
        var query = {}
        if (req.body.description != undefined) query['description'] = { $like: '%'+req.body.description+'%' }

        if (req.body['rating[0][op]'] != undefined) {
            const rating = req.body['rating[0][value]']
            switch(req.body['rating[0][op]']) {
                case 'gt': query.rating = { $gt: rating }
                default: query.rating = rating
            }
        }
        console.log('query: ' + JSON.stringify(query));
        Rating.findAll({
                where: query,
                limit: req.body.limit
            })
            .then( query => {
                return Promise.all(query.map( rating => {
                    return Rating.serialize(rating)
                }))
            })
            .then( query => {
                res.status(200).json(query)
            })
            .catch( error => {
                console.log('GET /rating/all/:uid - error while getting all ratings for user: ' + req.params.uid + ' ' + error)
                res.status(500).send()
            })
    })

    // Remove a rating by its ID, only the owner of the rating is able to remove it.
    //
    // @endpoint {DELETE} /rating/{rid}
    //
    // @param {String} rid - ID of the rating.
    // @body  {String} uid - ID of the user making the request.
    //
    .delete('/:rid', (req,res,next) => {
        const rid = req.params.rid

        Rating.findOne({ where: { rid: rid } })
            .then( result => {
                if (req.body.uid == result.rater_id) {
                    return Rating.destroy({ where: { rid: rid } })
                } else {
                    // TODO: this rating doesnt belong to this user
                    return Promise.reject(new Error("Rating doesn't belong to this user."))
                }
            })
            .then( result => {
                res.status(200).json(result)
            })
            .catch( error => {
                console.log('DELETE /rating/:rid - error while removing rating: ' + error)
                res.status(500).send()
            })
    })

module.exports = router
