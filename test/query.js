
const assert = require('chai').assert
const request = require('supertest')
const app = require('../server')

const User = require('../models').User
const Rating = require('../models').Rating

describe("Query", () => {

    describe("User", () => {

        it('Find a user with uid 13b16c46-91ba-4c58-a1ae-f00174fd6105', done => {
            User.findAll({ where: { uid: '13b16c46-91ba-4c58-a1ae-f00174fd6105' } })
                .then( result => {
                    assert(result[0].uid == '13b16c46-91ba-4c58-a1ae-f00174fd6105')
                    console.log(JSON.stringify(result))
                    done()
                })
        })

        it('Find a user named Lynda West', done => {
            User.findAll({ where: { name: 'Lynda West' } })
                .then( result => {
                    assert(result)
                    console.log(JSON.stringify(result))
                    done()
                })
        })

        it('Find a user with the email bobbihobbs@caxt.com', done => {
            User.findAll({
                    where: { email: 'bobbihobbs@caxt.com' }
                })
                .then( result => {
                    assert(result[0].uid == "5acdf844-f2e9-4797-bf37-50b4bf85a173")
                    console.log(JSON.stringify(result))
                    done()
                })
        })

        it('Find 5 users with excepteur in their description', done => {
            User.findAll({
                    where: {
                        description: {
                            $like: '%excepteur%'
                        }
                    },
                    limit: 5
                })
                .then( result => {
                    console.log(result.length)
                    console.log(JSON.stringify(result))
                    done()
                })
        })

        it('Find 5 users with caxt emails', done => {
            User.findAll({
                    where: { email: { $like: '%caxt.com%' } },
                    limit: 5
                })
                .then( result => {
                    assert(result.length == 5)
                    console.log(JSON.stringify(result))
                    done()
                })
        })

        it('Find users named Stanley or Christine', done => {
            User.findAll({
                    where: {
                        name: {
                            $or: [ { $like: '%Stanley%' }, { $like: '%Christine%' } ]
                        }
                    }
                })
                .then( result => {
                    console.log(result.length)
                    console.log(JSON.stringify(result))
                    done()
                })
        })

        it('Find the two newest users.', done => {
            User.findAll({
                    limit: 2,
                    order: [ [ 'createdAt', 'DESC' ] ]
                })
                .then( result => {
                    console.log(result.length)
                    console.log(JSON.stringify(result))
                    done()
                })
        })
    })

    describe('Ratings', () => {

        it('Find all ratings of a user.', done => {
            Rating.findAll({
                where: { ratee_id: '9333efbb-2618-4d92-9204-08ea4564cfae' }
            })
            .then( result => {
                console.log(result.length)
                console.log(JSON.stringify(result))
                done()
            })
        })

        it('Find ratings with a rating value of 5', done => {
            Rating.findAll({
                where: { rating: 5 }
            })
            .then( result => {
                console.log(result.length)
                console.log(JSON.stringify(result))
                done()
            })
        })

        it('Find ratings that are 2 or less.', done => {
            Rating.findAll({
                where: { rating: { $lte: 2 } }
            })
            .then( result => {
                console.log(result.length)
                console.log(JSON.stringify(result))
                done()
            })
        })

        it('Find rating between 2 and 4')

        it('Find the 5 most recent ratings.', done => {
            Rating.findAll({
                limit: 5,
                order: [ [ 'createdAt', 'DESC' ] ]
            })
            .then( result => {
                console.log(result.length)
                console.log(JSON.stringify(result))
                done()
            })
        })

        it('Find the top 5 most helpful ratings of a ratee.')

        it('Find the least helpful rating of a ratee.')

        it('Find ratings for a ratee that has _ in the description')
    })

})