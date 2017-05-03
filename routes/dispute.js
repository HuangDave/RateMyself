
const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const User = require('../models').User
const Rating = require('../models').Rating
const Dispute = require('../models').Dispute

router


    .post('/', validateToken, (req, res, next) => {
        const uid = req.body.uid
        const rid = req.body.rid
        const description = req.params.description
        Dispute.create({
            rid: rid,
            uid: uid,
            description: description
        })
        .then( dispute => {
            res.status(201).json(dispute)
        })
        .catch( error => {
            console.log('POST /dispute - error adding dispute: ' + error)
            res.status(500).send()
        })
    })

    .put('/:did', validateToken, (req, res, next) => {
        const did = req.params.did
        const uid = req.body.uid
        const description = req.body.description
        if (description != null || description != undefined) {
            Dispute.findOne({ where: { did: did } })
                .then( dispute => {
                    if (dispute.uid == uid) {
                        return Dispute.updateAttributes({
                            description: description
                        })
                    } else {
                        return Promise.reject(new Error("This dispute doesn't belong to this user."))
                    }
                })
                .then( result => {
                    res.status(200).send()
                })
                .catch( error => {
                    console.log('PUT /dispute/'+did+' error while updating dispute: ' + error)
                    res.status(500).send()
                })
        } else {
            res.status(500).json({ error: 'no updates provided' })
        }
    })

    .get('/:rid', (req, res, next) => {
        Dispute.findAll({ where: { rid: req.params.rid } })
            .then( disputes => {
                res.status(200).json(disputes)
            })
            .catch( error => {
                console.log('GET /dispute/' + req.params.rid + ' - error while querying disputes for rating: ' + error)
                res.status(500).send()
            })
    })

module.exports = router
