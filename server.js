
const express = require('express')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

const app = express()
const env = process.env.NODE_ENV
const port = process.env.PORT || 8080

const models = require('./models')                      // initialize/connect to db
models.User.sync({ force: false })
models.Rating.sync({ force: false })
models.Dispute.sync({ force: false })
models.Photo.sync({ force: false })
models.Tag.sync({ force: false })

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const ratingRouter = require('./routes/rating')
const disputeRouter = require('./routes/dispute')

app
    //.engine('html', require('ejs').renderFile)
    .set('view engine', 'ejs')                          // required for Heroku
    .set('views', path.join(__dirname, 'views'))

    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())

    .use(passport.initialize())
    .use(passport.session())

    .get('/', (req, res, next) => res.render('index'))

    .use('/auth', authRouter)
    .use('/user', userRouter)
    .use('/rating', ratingRouter)
    .use('/dispute', disputeRouter)
    .listen(port, () => console.log('Running on port: ' + port))

module.exports = app                                    // export for use in testing
