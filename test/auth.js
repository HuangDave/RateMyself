
const assert = require('chai').assert
const request = require('supertest')
const app = require('../server')

const sequelize = require('../db/database')
const User = require('../models/user')

const user = {
    email: 'test@email.com',
    password: '1234',
    name: 'John Appleseed'
}

describe('Auth', () => {

    before( done => {
        sequelize.sync()
            .then( () => done() )
    })

    after( done => {
        User.destroy({
            where: { email: user.email }
        })
        .then( deleted => {
            assert(deleted == 1)
            done()
        })
    })

    describe('Registration - ', () => {
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
                    done()
                })
        })
    })
})
