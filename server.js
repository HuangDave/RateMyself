
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
models.Articles.sync({ force: false })
models.Feedback.sync({ force: false })

const index = require('./routes/index')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const ratingRouter = require('./routes/rating')
const disputeRouter = require('./routes/dispute')
const articlesRouter = require('./routes/articles')

app
    .set('view engine', 'ejs')                          // required for Heroku
    .set('views', path.join(__dirname, '/app/views'))
    .use(express.static(path.join(__dirname, 'app')))

    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())

    .use(passport.initialize())
    .use(passport.session())

    .use('/', index)
    .use('/auth', authRouter)
    .use('/user', userRouter)
    .use('/rating', ratingRouter)
    .use('/dispute', disputeRouter)
    .use('/articles', articlesRouter)
    .listen(port, () => console.log('Running on port: ' + port))

module.exports = app                                    // export for use in testing
