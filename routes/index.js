
const express = require('express')
const router = express.Router()
const path = require('path')

router
    //.use(express.static(path.resolve(__dirname, "../controllers")))
    .get('/', (req, res, next) => {
        res.render('index')
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
    .get('/showuser/:uid', (req, res, next) => {
        res.render('user')
    })

module.exports = router
