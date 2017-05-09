
const models = require('./models')
const data = require('./test/test_data.json')

const users = data.users
const ratings = data.ratings
const disputes = data.disputes

Promise.all([
        models.User.sync({ force: false }),
        models.Rating.sync({ force: false }),
        models.Dispute.sync({ force: false }),
        models.Photo.sync({ force: false }),
        models.Tag.sync({ force: false }),
        models.Feedback.sync({ force: false })
    ].map( sync => {
        return sync
}))
.then( () => {
    return Promise.all(users.map( user => {
        return models.User.create({
            uid: user.uid,
            name: user.name,
            email: user.email,
            password: user.password,
            gender: user.gender,
            description: user.description
        })
    }))
})
.then( result => {
    console.log('total user insertions: ' + result.length)
    return Promise.all(ratings.map( rating => {
        return models.Rating.create({
            rater_id: rating.rid,
            ratee_id: rating.uid,
            rating: rating.rating,
            description: rating.description
        })
    }))
})
.then( result => {
    console.log('total rating insertions: ' + result.length)
    return Promise.all(disputes.map( dispute => {
        return models.Disputes.create({
            did: dispute.did,
            uid: dispute.uid,
            description: dispute.description
        })
    }))
})
.then( result => {
    console.log('total dispute insertions: ' + result.length)
    return Promise.all(feedbacks.map( feedback => {
        return models.Feedback.create({
            fid: feedback.fid,
            rid: feedback.rid,
            not_helpful: feedback.not_helpful,
            helpful: feedback.helpful
        })
    }))
})
.then( result => {
    console.log('total dispute insertions: ' + result.length)
    return
})
.catch( error => {
    console.log(JSON.stringify(error))
})
