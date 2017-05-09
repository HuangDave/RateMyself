
'use strict'
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Articles', {
        aid: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false }
    }, {
        timestamps: true,
        tableName: 'Articles'
    })
}
