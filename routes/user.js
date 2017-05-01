
const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const User = require('../models/user')

router

    .get('/:uid', (req, res, next) => {
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



module.exports = router
