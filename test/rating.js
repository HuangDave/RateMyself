
const assert = require('chai').assert
const request = require('supertest')
const app = require('../server')
const User = require('../models/user')
const Rating = require('../models/rating')

describe.skip('Rating', () => {

    before( done => {
        // TODO: authenticate
        Rating.sync().done( () => {
            done()
        })
    })
    describe('Adding', () => {
        it('an authenticated user should be able to rate another user')
    })
})
