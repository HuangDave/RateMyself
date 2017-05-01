
const Sequelize = require('sequelize')
const sequelize = require('../db/database').sequelize
const bcrypt = require("bcrypt-nodejs")
const Photo = require('./photo')

'use strict'
const User = sequelize.define('User', {
    uid:            { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    email:          { type: Sequelize.STRING, allowNull: false, unique: true },
    password:       { type: Sequelize.STRING, allowNull: false },
    name:           { type: Sequelize.STRING, allowNull: false },
    pid:            {
        type: Sequelize.INTEGER,
        references: {
            model: Photo,
            key: 'pid'
        }
    },
    description:    { type: Sequelize.STRING }

}, {
    hooks: {
        beforeCreate: user => user.set('password', bcrypt.hashSync(user.password))
    },
    classMethods: {
        isPassword: (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword),
    },
    timestamps: true,
    tableName: 'User'
})
User.sync()
module.exports = User
