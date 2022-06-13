const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');



class Event extends Model{}

Event.init ({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    location:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    details:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    time_stamp:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNul:false
    },
    start_date:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    end_date:{
        type:DataTypes.DATEONLY,
        allowNull:false,
    },
    admin_id:{
        type: DataTypes.INTEGER,
        references:{
            model:'user',
            key:'id'
        }
    }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName:'event',
})

module.exports = Event