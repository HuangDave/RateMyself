
'use strict'
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Rating', {
        rid:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        rater_id:    {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'uid'
            },
            allowNull: false
        },
        ratee_id:    {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'uid'
            },
            onDelete: 'cascade',
            allowNull: false
        },
        rating:      { type: DataTypes.INTEGER, allowNull: false }, // TODO: add boundary for rating 0<=rating<=5
        description: { type: DataTypes.STRING, allowNull: false },
        not_helpful: { type: DataTypes.INTEGER },
        helpful:     { type: DataTypes.INTEGER }

    }, {
        timestamps: true,
        tableName: 'Rating'
    })
}
/*
'use strict'
const Rating = sequelize.define('Rating', {
    rid:         { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    rater_id:    {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'uid'
        },
        allowNull: false
    },
    ratee_id:    {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'uid'
        },
        onDelete: 'cascade',
        allowNull: false
    },
    rating:      { type: Sequelize.INTEGER, allowNull: false }, // TODO: add boundary for rating 0<=rating<=5
    description: { type: Sequelize.STRING, allowNull: false },
    not_helpful: { type: Sequelize.INTEGER },
    helpful:     { type: Sequelize.INTEGER }

}, {
    timestamps: true,
    tableName: 'Rating'
})

Rating.sync()
module.exports = Rating
*/
