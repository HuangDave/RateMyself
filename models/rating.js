
const Sequelize = require('sequelize')
const sequelize = require('../db/database')
const User = require('./user')

'use strict'
const Rating = sequelize.define('Rating', {
    rid:         { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    rater_id:    {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'uid'
        },
        allowNull: false
    },
    ratee_id:    {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'uid'
        },
        allowNull: false
    },
    rating:      { type: Sequelize.INTEGER, allowNull: false }, // TODO: add boundary for rating 0<=rating<=5
    description: { type: Sequelize.STRING, allowNull: false },
    not_helpful: { type: Sequelize.INTEGER },
    helpful:     { type: Sequelize.INTEGER }

}, {
    timestamps: true,
    tableName: 'Rating'
})
//User.hasMany(Rating, { onDelete: 'cascade' })
Rating.sync()
module.exports = Rating
