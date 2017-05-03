
const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../config/passport')

// The router consists of endpoints to authenticate or register a user.
router

    // Register and authenticate a user.
    //
    // @endpoint {POST} /auth/register
    //
    // @param {String} email
    // @param {String} password
    //
    // @return {Object} On success, returns an object consisting of the user info and a JWT
    .post("/register", passport.authenticate("local-signup", { session: false }), generateToken, response)

    // Authenticate a user.
    //
    // @endpoint {POST} /auth/login
    //
    // @param {String} email
    // @param {String} password
    //
    // @return {Object} On success, returns an object consisting of the user info and a JWT
    .post("/login", passport.authenticate('local', { session: false }), generateToken, response)

    .get('/register', (req, res, next) => {
        res.send('register page')
    })

module.exports = router
