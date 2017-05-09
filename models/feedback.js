
// The Feedback table is a relational table for the Rating table.
// The table stores a feedback (helpful or non-helpful) of a rating.
// The uid of a user is also stored to prevent the user from providing
// displicate feedbacks for a single rating.

var _this

'use strict'
module.exports = (sequelize, DataTypes) => {
    _this = sequelize.define('Feedback', {
        fid: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        rid: {
            type: DataTypes.UUID,
            reference: {
                model: 'Rating',
                key: 'rid'
            },
            onDelete: 'CASCADE',
            allowNull: false
        },
        not_helpful: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
        helpful:     { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 }
    }, {
        classMethods: {
            incrementFor: (rid, helpful) => {
                const update = helpful ? 'helpful' : 'not_helpful'
                return _this.findOne({ where: { rid: rid } })
                        .then( feedback => {
                            feedback.increment(update)
                        })
            },
        },
        timestamps: true,
        tableName: 'Feedback'
    })
    return _this
}
