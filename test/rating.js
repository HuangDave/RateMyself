
const assert = require('chai').assert
const request = require('supertest')
const app = require('../server')

const User = require('../models').User
const Rating = require('../models').Rating

const mock_data = require('./user.json')

describe.skip('Rating', () => {

    var user, jwt

    before( done => {
        User.create(mock_data.user1)
        .then( () => {
            return User.create(mock_data.user2)
        })
        .then( user => {
            done()
        })
    })

    after( done => {
        User.destroy({ where: { uid: [1, 2, 3, 4, 5] } })
            .then( () => {
                return Rating.destroy({ where: { rid: [1,2,3,4,5,6] } })
            })
            .then( () => done() )
    })

    it('should be able to authenticate a registered user', done => {
        request(app)
            .post('/auth/login')
            .send({
                email: mock_data.user1.email,
                password: mock_data.user1.password
            })
            .expect(200, (error, res) => {
                if (error) throw new Error(error)
                assert(res.body.user.email == mock_data.user1.email)
                assert(res.body.token)
                user = res.body.user
                jwt = res.body.token
                done()
            })
    })

    describe('Adding', () => {
        it('an authenticated user should be able to rate another user', done => {
            request(app)
                .post('/rating/'+'2')
                .set('Authorization', 'bearer ' + jwt)
                .send({
                    rater_id: user.uid,
                    description: 'test rating',
                    rating: 5
                })
                .expect(201, (error, res) => {
                    console.log(JSON.stringify(res.body));
                    done()
                })
        })
    })
})
