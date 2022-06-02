const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");
const { extensions } = require('sequelize/types/utils/validator-extras');


class Event extends Model{}
