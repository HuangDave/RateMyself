
const models = require('./models')
const data = require('./test/test_data.json')

const users = data.users
const ratings = data.ratings
const disputes = data.disputes
const feedbacks = data.feedback
const articles = data.articles

Promise.all([
        models.User.sync({ force: true }),
        models.Rating.sync({ force: true }),
        models.Dispute.sync({ force: true }),
        models.Articles.sync({ force: true }),
        models.Feedback.sync({ force: true })
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
        var data = {
            rater_id: rating.rater_id,
            ratee_id: rating.ratee_id,
            rating: rating.rating,
            description: rating.description
        }
        if (rating.rid != undefined || rating.rid != null) {
            data.rid = rating.rid
        }
        return models.Rating.create(data)
    }))
})
.then( result => {
    console.log('total rating insertions: ' + result.length)
    return Promise.all(disputes.map( dispute => {
        return models.Dispute.create({
            did: dispute.did,
            uid: dispute.uid,
            rid: dispute.rid,
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
    return Promise.all(articles.map( article => {
        return models.Articles.create({
            aid: article.aid,
            title: article.title,
            article: article.article
        })
    }))
    .then( result => {
        console.log('total article insertions: ' + result.length)
        return
    })
})
.catch( error => {
    console.log(JSON.stringify(error))
})
