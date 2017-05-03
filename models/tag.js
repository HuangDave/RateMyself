
'use strict'
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Tag', {
        rid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Rating',
                key: 'rid'
            },
            allowNull: false
        },
        tag: { type: DataTypes.STRING, allowNull: false }

    }, {
        timestamps: true,
        tableName: 'Rating'
    })
}
