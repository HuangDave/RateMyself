
const Sequelize = require('sequelize')

var sequelize

/*
exports.initialize = path => {
    sequelize = new Sequelize('database', 'username', 'password', {
        dialect: 'sqlite',
        storage: path //'./db/database.db'
    })
    sequelize.sync({ force: true })
}

module.exports = sequelize
*/


exports.initialize = function(path) {
    sequelize = new Sequelize('database', 'username', 'password', {
        dialect: 'sqlite',
        storage: path //'./db/database.db'
    })
    sequelize.sync({ force: true })
}

exports.sequelize = sequelize
