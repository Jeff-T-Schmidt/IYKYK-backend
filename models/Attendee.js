const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Attendee extends Model {}

Attendee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            references: {
                model: 'event',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        invited_email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        going: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'attendee',
    }
);

module.exports = Attendee;