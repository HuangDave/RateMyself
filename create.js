
const models = require('./models')
const data = require('./test/test_data.json')

const users = data.users
const ratings = data.ratings

Promise.all([
        models.User.sync({ force: false }),
        models.Rating.sync({ force: false }),
        models.Dispute.sync({ force: false }),
        models.Photo.sync({ force: false }),
        models.Tag.sync({ force: false })
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
            description: user.description
        })
    }))
})
.then( result => {
    console.log('total user insertions: ' + result.length)
    return Promise.all(ratings.map( rating => {
        return models.Rating.create({
            rater_id: rating.rater_id,
            ratee_id: rating.ratee_id,
            rating: rating.rating,
            description: rating.description
        })
    }))
})
.then( result => {
    console.log('total rating insertions: ' + result.length)
    return
})
.catch( error => {
    console.log(JSON.stringify(error))
})
