
const Sequelize = require('sequelize')
const sequelize = require('../db/database').sequelize
const Rating = require('./rating')

'use strict'
const Photo = sequelize.define('Photo', {
    pid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: Sequelize.STRING, allowNull: false }
}, {
    timestamps: true,
    tableName: 'Photo'
})
Photo.sync()
module.exports = Photo
