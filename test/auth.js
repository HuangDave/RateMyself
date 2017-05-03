
const assert = require('chai').assert
const request = require('supertest')
const app = require('../server')

const User = require('../models').User

const user = require('./test_data.json').users[0]

describe('Auth', () => {

    after( done => {
        User.destroy({ where: { email: user.email } })
            .then( () => { done() })
    })

    describe('Registration', () => {

        it('should be able to register a new user.', done => {
            request(app)
                .post('/auth/register')
                .send({
                    email: user.email,
                    password: user.password,
                    name: user.name
                })
                .expect(200, (error, res) => {
                    if (error) throw new Error(error)
                    assert(res.body.user.email == user.email)
                    assert(res.body.token)
                    console.log("Registered user: " + JSON.stringify(res.body.user))
                    console.log("JWT: " + JSON.stringify(res.body.token))
                    done()
                })
        })
    })

    describe('Login', () => {

        it('should be able to authenticate a registered user', done => {
            request(app)
                .post('/auth/login')
                .send({
                    email: user.email,
                    password: user.password
                })
                .expect(200, (error, res) => {
                    if (error) throw new Error(error)
                    assert(res.body.user.email == user.email)
                    assert(res.body.token)
                    console.log("Authenticated user: " + JSON.stringify(res.body.user))
                    console.log("JWT: " + JSON.stringify(res.body.token))
                    done()
                })
        })
    })
})
