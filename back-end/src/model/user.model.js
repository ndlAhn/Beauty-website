const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define(
        'user',
        {
            user_id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
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
            role: {
                type: DataTypes.ENUM('user', 'admin'),
                defaultValue: 'user',
                allowNull: false,
            },
            skin_type: {
                type: DataTypes.ENUM('oily', 'dry', 'normal', 'combination', 'sensitive'),
                defaultValue: 'normal',
                allowNull: false,
            },
            skin_prob: {
                type: DataTypes.ENUM('acne', 'aging', 'dried', 'oily'),
                defaultValue: 'aging',
                allowNull: true,
            },
        },
        {
            timestamp: false,
        },
    );
    return Users;
};
