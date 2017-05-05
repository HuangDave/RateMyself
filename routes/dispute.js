
const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const User = require('../models').User
const Rating = require('../models').Rating
const Dispute = require('../models').Dispute

router

    // Allows a user to post a dispute about a rating.
    //
    // @endpoint {POST} /dispute/
    //
    // @body {String} uid - ID of the disputer.
    // @body {String} rid - ID of the rating being disputed.
    // @body {String} descripting - Explanation for the dispute.
    //
    .post('/', (req, res, next) => {
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

    // Allows the disputer to update the description of their dispute for a rating.
    //
    // @endpoint {PUT} /dispute/{did}
    //
    // @param {String} did - ID of the dispute.
    // @body  {String} uid - ID of the disputer.
    // @body  {String} description - New description to update.
    //
    .put('/:did', (req, res, next) => {
        const did = req.params.did
        const uid = req.body.uid
        const description = req.body.description
        if (description != null || description != undefined) {
            Dispute.findOne({ where: { did: did } })
                .then( dispute => {
                    if (dispute.uid == uid) {
                        return dispute.updateAttributes({
                            description: description
                        })
                    } else {
                        return Promise.reject(new Error("This dispute doesn't belong to this user."))
                    }
                })
                .then( result => {
                    res.status(200).json(result)
                })
                .catch( error => {
                    console.log('PUT /dispute/'+did+' error while updating dispute: ' + error)
                    res.status(500).send()
                })
        } else {
            res.status(500).json({ error: 'no updates provided' })
        }
    })

    // Get all disputes of a given rating.
    //
    // @endpoint {GET} /dispute/{rid}
    //
    // @param {String} rid - ID of the rating.
    //
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

    // Remove a dispute by its ID.
    //
    // @endpoint {DELETE} /dispute/{did}
    //
    // @param {String} did - ID of the dispute to remove.
    //
    .delete('/:did', (req, res, next) => {
        Dispute.destroy({ where: { did: req.params.did } })
            .then( result => {
                res.status(200).json(result)
            })
            .catch( error => {
                console.log('DELETE /dispute/' + req.params.did + ' - error while deleting dispute: ' + error)
                res.status(500).send()
            })
    })

module.exports = router
