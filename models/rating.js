
var _this

'use strict'
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.import('./user')

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
        description: { type: DataTypes.STRING, allowNull: false },
        not_helpful: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
        helpful:     { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 }

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
            }
        },
        hooks: {
            beforeUpdate: updateHook.before,
            afterUpdate: updateHook.after
        },
        timestamps: true,
        tableName: 'Rating'
    })
    return _this
}

serialize = (rating) =

updateHook = {
    before: (rating, options, next) => {
        console.log('Rating before update hook options: ' + JSON.stringify(options))
        console.log('Rating before update hook rating: ' + JSON.stringify(rating))
        if (options.fields.includes('ishelpful')) {
            // TODO: prevent a user from providing more than one feedback
            console.log('update includes ishelpful');
            next()
        } else {
            console.log('update doesnt include ishelpful');
            next()
        }
    },
    after: (rating, options, next) => {
        console.log('Rating after update hook options: ' + JSON.stringify(options))
        console.log('Rating after update hook rating: ' + JSON.stringify(rating))
        if (options.fields.includes('ishelpful')) {
            _this.otherAssociations.Feedback.create({

                })
                .then( feedback => {
                    console.log('Rating after update hook - feedback added for rating: ' + JSON.stringify(feedback))
                    next()
                })
        } else {
            next()
        }
    }
}
