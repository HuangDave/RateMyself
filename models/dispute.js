
var sequelize

'use strict'
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.import('./user')
    sequelize = sequelize.define('Dispute', {
        did: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        rid: {
            type: DataTypes.UUID,
            references: {
                model: 'Rating',
                key: 'rid'
            },
            onDelete: 'CASCADE',
            allowNull: false
        },
        uid: {
            type: DataTypes.UUID,
            references: {
                model: 'User',
                key: 'uid'
            },
            allowNull: false
        },
        description: { type: DataTypes.STRING }
    }, {
        classMethods: {
            serialize: (dispute) => {
                var result = JSON.parse(JSON.stringify(dispute))
                return User.serialize(dispute.uid)
                    .then( user => {
                        result.user = user
                        return result
                    })
            }
        },
        timestamps: true,
        tableName: 'Dispute'
    })
    return sequelize
}
