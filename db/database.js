
const environment = process.env.NODE_ENV
const connection = require('../config/config')[environment].connection
const Sequelize = require('sequelize')

var sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    //logging: false,
    storage: connection //'./db/database.db'
})
sequelize.sync()

module.exports = sequelize
