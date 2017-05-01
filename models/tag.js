
const Sequelize = require('sequelize')
const sequelize = require('../db/database')
const Rating = require('./rating')

'use strict'
const Tag = sequelize.define('Tag', {
    rid: {
        type: Sequelize.INTEGER,
        references: {
            model: Rating,
            key: 'rid'
        },
        allowNull: false
    },
    tag: { type: Sequelize.STRING, allowNull: false }

}, {
    timestamps: true,
    tableName: 'Rating'
})
//User.hasMany(Rating, { onDelete: 'cascade' })
Tag.sync()
module.exports = Tag
