
const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const User = require('../models/user')
const Rating = require('../models/rating')

router


    .post('/:uid/ratings', validateToken, (req, res, next) => {
        const rater_id = req.params.uid
        const ratee_id = req.body.ratee_id
        const description = req.body.description
        return Rating.create({
            rater_id: rater_id,
            ratee_id: ratee_id,
            description: description
        })
        .then( rating => {
            res.status(201).json(rating)
        })
        .catch( errro => {
            console.log('POST /rating/'+rater_id+'/ratings - error occured while adding a new rating: ' + JSON.stringify({
                rater_id: rater_id,
                ratee_id: ratee_id,
                description: description
            }))
            console.log('POST /rating/:uid/ratings - error: ' + error)
            res.status(500).send()
        })
    })

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
            .catch( error => {
                console.log('PUT /rating/'+req.params.rid+' - error while adding feedback for rating: ' + error)
                res.status(500).send()
            })
    })

    .put('/:rid/helpfulness', validateToken, (req,res,next) => {
        Rating.findOne({ where: { rid: req.params.rid } })
            .then( rating => {
                const update = req.params.ishelpful ? 'helpful' : 'not_helpful'
                return rating.increment(update).sync()
            })
            .then( result => {
                res.status(200).send()
            })
            .catch( error => {
                console.log('PUT /:rid/helpfullness - error while adding feedback for rating: ' + error)
                res.status(500).send()
            })
    })

    .get('/:uid', (req, res, next) => {
        Rating.findAll({ where: { ratee_id: req.params.uid } })
            .then( query => {
                res.status(200).json(query)
            })
            .catch( error => {
                console.log('GET /rating/:uid - error while getting all ratings for user: ' + req.params.uid + ' ' + error)
                res.status(500).send()
            })
    })

    .delete('/:rid', validateToken, (req,res,next) => {
        const rid = req.params.rid
        Rating.findOne({ where: { rid: rid } })
            .then( result => {
                if (req.body.uid == result.rater_id) {
                    return Rating.destroy({ rid: rid })
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