
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
/*
'use strict'
const Tag = sequelize.define('Tag', {
    rid: {
        type: Sequelize.INTEGER,
        references: {
            model: Rating,
            key: 'rid'
        },
        allowNull: false
    },
    tag: { type: Sequelize.STRING, allowNull: false }

}, {
    timestamps: true,
    tableName: 'Rating'
})
//User.hasMany(Rating, { onDelete: 'cascade' })
Tag.sync()
module.exports = Tag
*/
