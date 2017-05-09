
const express = require('express')
const router = express.Router()
const Articles = require('../models').Articles

router

    .get('/all', (req, res, next) => {
        Articles.findAll()
            .then( results => {
                res.status(200).json(results)
            })
            .catch( error => {
                console.log('/articles/all error getting articles: ' + error)
                res.status(500).send()
            })
    })

module.exports = router
