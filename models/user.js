
const bcrypt = require('bcrypt-nodejs')

'use strict'
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
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
        gender:         { type: DataTypes.STRING, allowNull: false, defaultValue: 'N/A'},
        description:    { type: DataTypes.STRING }

    }, {
        hooks: {
            beforeCreate: user => user.set('password', bcrypt.hashSync(user.password))
        },
        classMethods: {
            isPassword: (password, encodedPassword) => {
                return bcrypt.compareSync(password, encodedPassword)
            },
            serialize: (uid) => {
                return User.findOne({ where: { uid: uid } })
                    .then( user => {
                        return {
                            uid: user.uid,
                            name: user.name,
                            email: user.email,
                            description: user.description,
                            pid: user.pid
                        }
                    })
            }
        },
        timestamps: true,
        tableName: 'User'
    })
    return User
}
