
const express = require('express')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')

const app = express()
const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 8080

const _ = require('./db/database')                      // initialize/connect to db

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const ratingRouter = require('./routes/rating')
const disputeRouter = require('./routes/dispute')

app
    .set('view engine', 'ejs')                          // required for Heroku
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(passport.initialize())
    .use('/auth', authRouter)
    .use('/user', userRouter)
    .use('/rating', ratingRouter)
    .use('/dispute', disputeRouter)
    .listen(port, () => console.log('Running on port: ' + port))

module.exports = app                                    // export for use in testing
