
var _this

'use strict'
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.import('./user')
    const Dispute = sequelize.import('./dispute')
    const Feedback = sequelize.import('./feedback')

    _this = sequelize.define('Rating', {
        rid:         { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        rater_id:    {
            type: DataTypes.UUID,
            references: {
                model: 'User',
                key: 'uid'
            },
            allowNull: false
        },
        ratee_id:    {
            type: DataTypes.UUID,
            references: {
                model: 'User',
                key: 'uid'
            },
            onDelete: 'CASCADE',
            allowNull: false
        },
        rating:      { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, validate: { min: 0, max: 5 } },
        description: { type: DataTypes.STRING, allowNull: false }

    }, {
        classMethods: {
            associate: (models) => {
                _this.hasMany(models.Feedback)
            },
            serialize: (rating) => {
                var result = JSON.parse(JSON.stringify(rating))
                return User.serialize(rating.rater_id)
                            .then( user => {
                                result.rater = user
                                return User.serialize(rating.ratee_id)
                            })
                            .then( user => {
                                result.ratee = user
                                result.ratee_id = undefined
                                result.rater_id = undefined
                                return result
                            })
                            .then( result => {
                                return Dispute.findAll({ where: { rid: result.rid } })
                                    .then( disputes => {
                                        return Promise.all(disputes.map( d => { return Dispute.serialize(d) }))
                                        .then( serializedData => {
                                            result.disputes = serializedData
                                            return result
                                        })
                                    })
                            })
                            .then( result => {
                                return Feedback.findOne({ where: { rid: result.rid } })
                                        .then( feedback => {
                                            result.feedback = feedback
                                            return result
                                        })
                            })
            }
        },
        hooks: {
            afterCreate: (rating, next) => { return Feedback.create({ rid: rating.rid }) }
        },
        timestamps: true,
        tableName: 'Rating'
    })
    return _this
}
