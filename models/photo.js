
'use strict'
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Photo', {
        pid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        url: { type: DataTypes.STRING, allowNull: false }
    }, {
        timestamps: true,
        tableName: 'Photo'
    })
}
