
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
            onDelete: 'CASCADE',
            allowNull: false
        },
        rating:      { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0, max: 5 } },
        description: { type: DataTypes.STRING, allowNull: false },
        not_helpful: { type: DataTypes.INTEGER },
        helpful:     { type: DataTypes.INTEGER }

    }, {
        timestamps: true,
        tableName: 'Rating'
    })
}
