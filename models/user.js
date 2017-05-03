
const bcrypt = require('bcrypt-nodejs')

'use strict'
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        uid:            { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        email:          { type: DataTypes.STRING, allowNull: false, unique: true },
        password:       { type: DataTypes.STRING, allowNull: false },
        name:           { type: DataTypes.STRING, allowNull: false },
        pid:            {
            type: DataTypes.UUID,
            references: {
                model: 'Photo',
                key: 'pid'
            }
        },
        description:    { type: DataTypes.STRING }

    }, {
        hooks: {
            beforeCreate: user => user.set('password', bcrypt.hashSync(user.password))
        },
        classMethods: {
            isPassword: (encodedPassword, password) => {
                return bcrypt.compareSync(password, encodedPassword)
            },
        },
        timestamps: true,
        tableName: 'User'
    })
}
