
// The Feedback table is a relational table for the Rating table.
// The table stores a feedback (helpful or non-helpful) of a rating.
// The uid of a user is also stored to prevent the user from providing
// displicate feedbacks for a single rating.

'use strict'
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Feedback', {
        rid: {
            type: DataTypes.UUID,
            reference: {
                model: 'Rating',
                key: 'rid'
            },
            onDelete: 'CASCADE',
            allowNull: false
        },
        uid: {
            type: DataTypes.UUID,
            reference: {
                model: 'User',
                key: 'uid'
            },
            allowNull: false
        },
        helpful: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        timestamps: true,
        tableName: 'Feedback'
    })
}
