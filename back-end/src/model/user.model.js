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
            acne: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            aging: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            dried: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            oily: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            skin_recovery: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            bio: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            hydration: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            acne_control: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            anti_aging: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            brightening: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            oil_control: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            smooth_and_repair: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            timestamp: false,
        },
    );
    return Users;
};
