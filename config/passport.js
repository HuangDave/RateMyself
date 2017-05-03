
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken')

const User = require('../models').User
const secret = require('./config').secret

passport
    .use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, authenticate))
    .use("local-signup", new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }, register))

function authenticate(email, password, done) {
    console.log('attempting to authenticate user: ' + JSON.stringify({
        email: email, password: password
    }));
    User.findOne({
        where: { email: email }
    })
    .then( user => {
        if (user != null) {
            if (User.isPassword(user.password, password)) { // correct password...
                done(null, user)
            } else {
                return Promise.reject(('Incorrect username/password.'))
            }
        } else {
            return Promise.reject('This email is not registered.')
        }
    })
    .catch( error => {
        done(new Error(error))
    })
}

function register(req, email, password, done) {
    console.log('attempting to register user: ' + JSON.stringify({
        name: req.body.name, email: email, password: password
    }));
    User.create({
        email: email,
        password: password,
        name: req.body.name
    })
    .then( user => {        // successful inserted a new user...
        done(null, user)    // callback to authenticate and provide JWT to user...
    })
    .catch(error => {
        console.log('/auth/register register(req, email, password, done) - error occured while attempting to insert new user: ' + error)
        done(error)         //
    })
}

// Sign a JWT token for an authenticated user.
generateToken = function(req, res, next) {
    req.token = jwt.sign({          // use uid to sign a JWT...
        user: req.user.uid,
    }, secret, {
        expiresIn: 3600 * 24 * 14   // set how long JWT is valid for...
    });
    next();
}

// Authenticate a token for a user attempting to login
validateToken = function(req, res, next) {
    req.token = req.headers.authorization.split(" ")[1]
    jwt.verify(req.token, secret, (err, decoded) => {
        if (!err) {
            next()
        } else {
            res.status(401).send(err);
        }
    })
}

// Response for successful authentication.
//
// @return {JSON} Returns the user's uid and the signed JWT token if authentication was successful.
response = function(req, res) {
    res.status(200).json({
        user: req.user,
        token: req.token
    })
}
