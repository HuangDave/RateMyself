
const Sequelize = require('sequelize')
const sequelize = require('../db/database').sequelize
const User = require('./user')
const Rating = require('./rating')

'use strict'
const Dispute = sequelize.define('Dispute', {
    did: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    rid: {
        type: Sequelize.INTEGER,
        references: {
            model: Rating,
            key: 'rid'
        }
    },
    uid: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'uid'
        }
    },
    description: { type: Sequelize.STRING }
}, {
    timestamps: true,
    tableName: 'Dispute'
})
Dispute.sync()
module.exports = Dispute

'CREATE TABLE IF NOT EXISTS Dispute (' +
    'did INTEGER PRIMARY KEY AUTOINCREMENT,' +
    'rid INTEGER NOT NULL,' +
    'uid INTEGER NOT NULL,' +
    'description VARCHAR(5000) NOT NULL,' +
    'createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, ' +
    'updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, ' +
    'FOREIGN KEY (rid) REFERENCES Rating(rid) ON DELETE CASCADE,' +
    'FOREIGN KEY (uid) REFERENCES User(uid)' +
')'
