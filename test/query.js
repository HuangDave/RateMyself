
const assert = require('chai').assert
const request = require('supertest')
const app = require('../server')

const User = require('../models').User
const Rating = require('../models').Rating
const Dispute = require('../models').Dispute
const Articles = require('../models').Articles
const Feedback = require('../models').Feedbacks

const logger = require('../config/logger')
const sequelize = require('../models/')

describe("Query", () => {

    describe("User", () => {

        it('Find a user with uid 13b16c46-91ba-4c58-a1ae-f00174fd6105', done => {
            User.findAll({ where: { uid: '13b16c46-91ba-4c58-a1ae-f00174fd6105' } })
            .then( result => {
                assert(result[0].uid == '13b16c46-91ba-4c58-a1ae-f00174fd6105')
                logger.log(JSON.stringify(result))
                done()
            })
        })

        it('Find a user named Lynda West', done => {
            User.findAll({ where: { name: 'Lynda West' } })
            .then( result => {
                assert(result)
                logger.log(JSON.stringify(result))
                done()
            })
        })

        it('Find 10 male users.', done => {
            User.findAll({
                where: { gender: 'Male' },
                limit: 10
            })
            .then( result => {
                assert(result.length == 10)
                logger.log(JSON.stringify(result))
                done()
            })
        })

        it('Find 10 female users.', done => {
            User.findAll({
                where: { gender: 'Female' },
                limit: 10
            })
            .then( result => {
                assert(result.length == 10)
                logger.log(JSON.stringify(result))
                done()
            })
        })

        it('Find a user with the email bobbihobbs@caxt.com', done => {
            User.findAll({
                where: { email: 'bobbihobbs@caxt.com' }
            })
            .then( result => {
                assert(result[0].uid == "5acdf844-f2e9-4797-bf37-50b4bf85a173")
                logger.log(JSON.stringify(result))
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
                logger.log(result.length)
                logger.log(JSON.stringify(result))
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
                logger.log(JSON.stringify(result))
                done()
            })
        })

        it('Find users with yahoo emails.', done => {
            User.findAll({
                where: { email: { $like: '%yahoo.com%' } }
            })
            .then( result => {
                logger.log(JSON.stringify(result))
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
                logger.log(result.length)
                logger.log(JSON.stringify(result))
                done()
            })
        })

        it('Find the two of the newests users.', done => {
            User.findAll({
                limit: 2,
                order: [ [ 'createdAt', 'DESC' ] ]
            })
            .then( result => {
                logger.log(result.length)
                logger.log(JSON.stringify(result))
                done()
            })
        })
        it('Find the oldest user with name starting with a B.', done => {
            User.findOne({
                where: { name: { $like: 'B%' } },
                order: [ [ 'createdAt', 'ASC' ] ]
            })
            .then( result => {
                logger.log(result.length)
                logger.log(JSON.stringify(result))
                done()
            })
        })

        it("Update a user's description who has email 'bobbihobbs@caxt.com'.", done => {
            User.update({
                description: 'brand new description for bobbihobbs'
            }, {
                where: { email: 'bobbihobbs@caxt.com' },
            })
            .then( result => {
                logger.log(JSON.stringify(result))
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
                logger.log(result.length)
                logger.log(JSON.stringify(result))
                done()
            })
        })

        it('Find ratings with a rating value of 5', done => {
            Rating.findAll({
                where: { rating: 5 }
            })
            .then( result => {
                logger.log(result.length)
                logger.log(JSON.stringify(result))
                done()
            })
        })

        it('Find ratings that are 2 or less.', done => {
            Rating.findAll({
                where: { rating: { $lte: 2 } }
            })
            .then( result => {
                logger.log(result.length)
                logger.log(JSON.stringify(result))
                done()
            })
        })

        it('Find ratings between 2 and 4', done => {
            Rating.findAll({
                where: { rating: { between: [2, 4] } },
            })
            .then( result => {
                logger.log(result.length)
                logger.log(JSON.stringify(result))
                done()
            })
        })

        it('Find the 5 most recent ratings.', done => {
            Rating.findAll({
                limit: 5,
                order: [ [ 'createdAt', 'DESC' ] ]
            })
            .then( result => {
                logger.log(result.length)
                logger.log(JSON.stringify(result))
                done()
            })
        })

        it('Find the most recent rating submited by a user.', done => {
            sequelize.sequelize.query("SELECT rid " +
            "FROM User u, Rating r "+
            "WHERE u.name='Bertie Wheeler' AND "+
            "u.uid=r.rater_id "+
            "ORDER BY r.createdAt DESC "+
            "LIMIT 1")
            .then( result => {
                logger.log(JSON.stringify(result))
                done()
            })
        })

        it("Find ratings with 'bad' in the description.", done => {
            Rating.findAll({
                where: { description: { $like: '%bad%' } }
            })
            .then( result => {
                logger.log(JSON.stringify(result))
                done()
            })
        })
    })

    describe('Disputes', () => {

        it('Find all disputes for a rating.',  done => {
            Dispute.findAll({
                where: { rid: "01de70ef-20b0-4d9a-bae1-01944955b875"}

            })
            .then( result => {
                logger.log(result.length)
                logger.log(JSON.stringify(result))
                done()
            })
        })

        it('Find the 5 most recent disputes submited by a user.', done => {
            Dispute.findAll({
                where: { uid: "f10fa00f-83bc-47b7-8b68-b14c2d3a6691" },
                limit: 5,
                order: [ [ 'createdAt', 'DESC' ] ]
            })
            .then( result => {
                logger.log(result.length)
                logger.log(JSON.stringify(result))
                done()
            })
        })
        it('Find the 5 most recent disputes submited by a user.', done => {
            Dispute.findAll({
                where: { uid: "65d23904-89ee-470d-a794-22a9fd57301d" },
                limit: 5,
                order: [ [ 'createdAt', 'DESC' ] ]
            })
            .then( result => {
                logger.log(result.length)
                logger.log(JSON.stringify(result))
                done()
            })
        })
        it('Find the 5 most oldest disputes submited by a user.', done => {
            Dispute.findAll({
                where: { uid: "65d23904-89ee-470d-a794-22a9fd57301d" },
                limit: 5,
                order: [ [ 'createdAt', 'ASC' ] ]
            })
            .then( result => {
                logger.log(result.length)
                logger.log(JSON.stringify(result))
                done()
            })
        })
        it('Find the 5 most oldest disputes submited by a user.', done => {
            Dispute.findAll({
                where: { uid: "f10fa00f-83bc-47b7-8b68-b14c2d3a6691" },
                limit: 5,
                order: [ [ 'createdAt', 'ASC' ] ]
            })
            .then( result => {
                logger.log(result.length)
                logger.log(JSON.stringify(result))
                done()
            })
        })

        it('Find all users who dispute', done => {
            sequelize.sequelize.query ("Select DISTINCT s.uid FROM User s, Dispute d Where d.uid = s.uid")
                .then( result => {
                    logger.log(result.length)
                    logger.log(JSON.stringify(result))
                    done()
                })
    })

    describe('Articles', () => {

        it("Find 5 blog posts.", done => {
            Articles.findAll({ limit: 5})
            .then( result => {
                assert(result.length == 5)
                logger.log(JSON.stringify(result))
                done()
            })
        })

        it("Find blog posts consiting of phrases 'adipisicing' or 'reprehenderit'.", done => {
            Articles.findAll({
                where: {
                    article: { $or: [ { $like: '%'+'adipisicing'+'%' }, { $like: '%'+'reprehenderit'+'%' }] }
                }
            })
            .then( result => {
                logger.log(JSON.stringify(result))
                done()
            })
        })

        it('Find the most recent blog post.', done => {
            Articles.findAll({
                limit: 1,
                order: [ [ 'createdAt', 'DESC' ] ]
            })
            .then( result => {
                logger.log(JSON.stringify(result))
                done()
            })
        })

        it('Find the oldest blog post.', done => {
            Articles.findOne({
                order: [ [ 'createdAt', 'ASC' ] ]
            })
            .then( result => {
                logger.log(JSON.stringify(result))
                done()
            })
        })

        it("Find the blog post with title 'How to be a Better Person'.", done => {
            Articles.findOne({ where: { title: 'How to be a Better Person.' } })
            .then( result => {
                logger.log(JSON.stringify(result))
                done()
            })
        })
    })
})
})
