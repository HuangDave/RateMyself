
const assert = require('chai').assert
const request = require('supertest')
const app = require('../server')

const User = require('../models').User
const Rating = require('../models').Rating

describe("Query", () => {

    describe("User", () => {

        it('1 - Find a user with uid 13b16c46-91ba-4c58-a1ae-f00174fd6105', done => {
            User.findAll({ where: { uid: '13b16c46-91ba-4c58-a1ae-f00174fd6105' } })
                .then( result => {
                    assert(result[0].uid == '13b16c46-91ba-4c58-a1ae-f00174fd6105')
                    console.log(JSON.stringify(result))
                    done()
                })
        })

        it('2 - Find a user named Lynda West', done => {
            User.findAll({ where: { name: 'Lynda West' } })
                .then( result => {
                    assert(result)
                    console.log(JSON.stringify(result))
                    done()
                })
        })

        it('3 - Find a user with the email bobbihobbs@caxt.com', done => {
            User.findAll({
                    where: { email: 'bobbihobbs@caxt.com' }
                })
                .then( result => {
                    assert(result[0].uid == "5acdf844-f2e9-4797-bf37-50b4bf85a173")
                    console.log(JSON.stringify(result))
                    done()
                })
        })

        it('4 - Find 5 users with excepteur in their description', done => {
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

        it('5 - Find 5 users with caxt emails', done => {
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

        it('6 - Find users named Stanley or Christine', done => {
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

        it('7 - Find the two newest users.', done => {
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

})
