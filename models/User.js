const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt")

class User extends Model {
checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
}
}

User.init({
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[8]
        }
    }
},
{
    hooks:{
        beforeCreate:async userdata=>{
            userdata.password = await bcrypt.hash(userdata.password,5)
            return userdata
        }
    },
    beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
});
module.exports=User