
const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const User = require('../models').User
const Rating = require('../models').Rating

router


    // @endpoint {POST} /rating/{uid}
    //
    // @param {String} uid         - ID of the user posting the new rating.
    // @body  {String} rater_id    - ID of the user being rated.
    // @body  {Int}    rating      - Rating must be a real number between from 0 to 5.
    // @body  {String} description -
    .post('/', validateToken, (req, res, next) => {
        const rater_id = req.body.rater_id
        const ratee_id = req.body.ratee_id
        const rating = req.body.rating
        const description = req.body.description
        return Rating.create({
            rater_id: rater_id,
            ratee_id: ratee_id,
            rating: rating,
            description: description
        })
        .then( rating => {
            res.status(201).json(rating)
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

    // @endpoint {PUT} /rating/{rid}
    //
    //@param {String} rid -
    //@body  {String} uid -
    .put('/:rid', validateToken, (req, res, next) => {
        const uid = req.body.uid
        Rating.findOne({ where: { rid: req.params.rid } })
            .then( rating => {
                if (uid == rating.rater_id) {
                    return rating.updateAttributes({
                        description: req.body.description
                    })
                } else {
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

    // @param {String} rid -
    // @body  {String} ishelpful
    .post('/:rid/helpfulness', validateToken, (req,res,next) => {
        Rating.findOne({ where: { rid: req.params.rid } })
            .then( rating => {
                const update = req.body.ishelpful ? 'helpful' : 'not_helpful'
                return rating.increment(update)//.sync()
            })
            .then( result => {
                res.status(200).send()
            })
            .catch( error => {
                console.log('PUT /:rid/helpfullness - error while adding feedback for rating: ' + error)
                res.status(500).send()
            })
    })

    .get('/:rid', (req, res, next) => {
        Rating.findOne({ where: { rid: req.params.rid } })
            .then( rating => {
                console.log('found rating: ' + JSON.stringify(rating));
                res.status(200).json(rating)
            })
            .catch( error => {
                console.log('GET /rating/:rid - error while getting rating: ' + req.params.uid + ' ' + error)
                res.status(500).send()
            })
    })

    // @param {String} uid -
    .get('/all/:uid', (req, res, next) => {
        Rating.findAll({ where: { ratee_id: req.params.uid } })
            .then( query => {
                res.status(200).json(query)
            })
            .catch( error => {
                console.log('GET /rating/all/:uid - error while getting all ratings for user: ' + req.params.uid + ' ' + error)
                res.status(500).send()
            })
    })

    // @param {String} rid
    // @body  {String} uid
    .delete('/:rid', validateToken, (req,res,next) => {
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
