
const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const User = require('../models').User

router

    // Get a user by their id
    //
    // @endpoint /user/id/{uid}
    //
    // @param {String} uid
    //
    .get('/id/:uid', (req, res, next) => {
        User.findOne({
            where: { uid: req.params.uid}
        })
        .then( user => {
            res.status(200).json(user)
        })
        .catch( error => {
            res.status(404).send()
        })
    })

    // Get all users
    //
    // @endpoint /user/all?limit?={limit}
    //
    // @query {Number} limit
    //
    .get('/all?:limit?', (req, res, next) => {
        User.findAll({ limit: req.query.limit})
            .then( results => {
                res.status(200).json(results)
            })
            .catch( error => {
                res.status(500).send(error)
            })
    })

module.exports = router
