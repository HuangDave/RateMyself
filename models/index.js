"use strict"

const fs        = require("fs")
const path      = require("path")
const Sequelize = require("sequelize")
const env       = process.env.NODE_ENV || "production"
const config    = require('../config/config')[env].db

const logger = require('../config/logger')

var options = {
    dialect: 'sqlite',
    logging: false,
    storage: config.connection
}

if (env == 'test') options.logging = logger.log

const sequelize = new Sequelize('database', 'username', 'password', options)

var db = {}

fs
    .readdirSync(__dirname)
    .filter( file => {
        return (file.indexOf(".") !== 0) && (file !== "index.js")
    })
    .forEach( file => {
        var model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
    })

Object.keys(db).forEach( modelName => {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
