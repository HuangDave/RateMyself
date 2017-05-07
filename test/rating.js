
const assert = require('chai').assert
const request = require('supertest')
const app = require('../server')

const User = require('../models').User
const Rating = require('../models').Rating

const data = require('./test_data.json').users

// Helper functions

// Authenticate a user.
//
// @param {String} email
// @param {String} password
// @return {Object} On success, returns an object containing the User and JWT.
authenticate = (email, password) => {
    return new Promise( (resolve, reject) => {
        request(app)
            .post('/auth/login')
            .send({
                email: email,
                password: password
            })
            .expect(200, (error, res) => {
                if (error) reject(error)
                else       resolve(res.body)
            })
    })
}

describe.skip('Rating', () => {

    var users = []
    var ratee
    var rating
    var jwt

    before( done => {
        Promise.all(data.map( user => {
            return User.create(user).then( result => {
                console.log('inserted user ' + JSON.stringify(result));
                users.push(result)
                return true
            })
        }))
        .then( () => {
            const user = data[0]
            return authenticate(user.email, user.password)
        })
        .then( user => {
            jwt = user
            done()
        })
        .catch( error => {
            console.log(error);
            throw error
        })
    })

    after( done => {
        Promise.all(data.map( user => {
            return User.destroy({ where: { email: user.email } })
        }))
        .then( () => {
            done()
        })
    })

    describe('Add', () => {

        it('an authenticated user should be able to rate another user', done => {
            const user = users[0]
            request(app)
                .post('/rating/')
                .set('Authorization', 'bearer ' + jwt.token)
                .send({
                    rater_id: jwt.user.uid,
                    ratee_id: users[1].uid,
                    description: 'test rating',
                    rating: 3
                })
                .expect(201, (error, res) => {
                    if (error) throw new Error(error)
                    assert(res.body)
                    console.log(JSON.stringify(res.body))
                    ratee = res.body.ratee_id
                    done()
                })
        })
    })

    describe('Query', () => {

        it('should be able to query all ratings of a user', done => {
            request(app)
                .get('/rating/all/'+ratee)
                .send()
                .expect(200, (error, res) => {
                    if (error) throw new Error(error)
                    assert(res.body)
                    console.log(JSON.stringify(res.body))
                    rating = res.body[0]
                    done()
                })
        })

        it('it should be able to query a rating', done => {
            request(app)
                .get('/rating/'+rating.rid)
                .send()
                .expect(200, (error, res) => {
                    if (error) throw new Error(error)
                    assert(res.body)
                    console.log(JSON.stringify(res.body))
                    done()
                })
        })
    })

    describe('Update', () => {
        it('should be able to update a rating', done => {
            request(app)
                .put('/rating/'+rating.rid)
                .set('Authorization', 'bearer ' + jwt.token)
                .send({
                    uid: jwt.user.uid,
                    description: 'new description'
                })
                .expect(200, (error, res) => {
                    if (error) throw new Error(error)
                    assert(res.body)
                    assert(res.body.description == 'new description')
                    done()
                })
        })
    })

    describe.skip('Helpfullness', () => {

        it('should allow a user to provide feedback on if a rating was helpful or non-helpful', done => {
            authenticate(data[1].email, data[1].password)
                .then( user => {
                    done()
                })
        })
    })

    describe('Dispute', () => {

        var disputer
        var dispute = null

        it('a user should be able to dispute a rating', done => {
            authenticate(data[2].email, data[2].password)
                .then( result => {
                    console.log('authenticated disputer' + JSON.stringify(result))
                    disputer = result
                    request(app)
                        .post('/dispute/')
                        .set('Authorization', 'bearer ' + disputer.token)
                        .send({
                            uid: disputer.user.uid,
                            rid: rating.rid,
                            description: 'this rating was unhelpful'
                        })
                        .expect(201, (error, res) => {
                            if (error) throw new Error(error)
                            assert(res.body)
                            console.log(JSON.stringify(res.body))
                            dispute = res.body
                            done()
                        })
                })
        })

        it('should be able to update a descpute', done => {
            request(app)
                .put('/dispute/'+dispute.did)
                .set('Authorization', 'bearer ' + disputer.token)
                .send({
                    uid: disputer.user.uid,
                    description: 'new description'
                })
                .expect(200, (error, res) => {
                    if (error) throw new Error(error)
                    assert(res.body)
                    assert(res.body.description == 'new description')
                    console.log(JSON.stringify(res.body))
                    done()
                })
        })
    })

    describe('Delete', () => {

        it('should be able to remove a rating', done => {
            request(app)
                .delete('/rating/'+rating.rid)
                .set('Authorization', 'bearer ' + jwt.token)
                .send({
                    uid: jwt.user.uid
                })
                .expect(200, (error, res) => {
                    if (error) throw new Error(error)
                    assert(res.body)
                    done()
                })
        })
    })
})
