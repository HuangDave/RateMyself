
const express = require('express')
const router = express.Router()

router
    .get('/', (req, res, next) => {
        res.render('home')
    })
    .get('/register', (req, res, next) => {
        res.render('register')
    })
    .get('/login', (req, res, next) => {
        res.render('login')
    })
    .get('/test', (req, res, next) => {
        res.render('test')
    })

module.exports = router
