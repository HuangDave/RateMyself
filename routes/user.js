
const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const User = require('../models').User

router

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

    .get('/all?:limit?', (req, res, next) => {
        console.log('querying all users limit:' + req.params.limit);
        User.findAll({ limit: req.params.limit})
            .then( results => {
                res.status(200).json(results)
            })
            .catch( error => {
                res.status(500).send(error)
            })
    })



module.exports = router
