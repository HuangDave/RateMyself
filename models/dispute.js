
'use strict'
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Dispute', {
        did: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        rid: {
            type: DataTypes.INTEGER,
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
        timestamps: true,
        tableName: 'Dispute'
    })
}
