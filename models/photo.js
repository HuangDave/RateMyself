
'use strict'
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Photo', {
        pid: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        url: { type: DataTypes.STRING, allowNull: false }
    }, {
        timestamps: true,
        tableName: 'Photo'
    })
}
