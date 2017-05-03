
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
/*
'use strict'
const Photo = sequelize.define('Photo', {
    pid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: Sequelize.STRING, allowNull: false }
}, {
    timestamps: true,
    tableName: 'Photo'
})
Photo.sync()
module.exports = Photo
*/
