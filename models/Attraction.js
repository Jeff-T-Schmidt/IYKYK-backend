const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Attraction extends Model {}

Attraction.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    time_stamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    event_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references:{
        model:'event',
        key:'id',
        }
    },
},
{
    sequelize,
    modelName:'event',
}
)

module.exports = Attraction