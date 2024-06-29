
const {DataTypes} = require('sequelize')
module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("user", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            alowNull: false,
        },
        dob: {
            type: DataTypes.DATE,
            alowNull: false,
        },
        role_type: {
            type: DataTypes.ENUM({
            values: ['admin', 'user']}),
        },
    },
    {
        timestamp: false,
    }
    )
    return Users;
};