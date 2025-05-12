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
            skin_type: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: false,
            },
            enlarged_pores: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            scarring: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            fragrance: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            alcohol: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            silicones: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            parabens: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            essential_oil: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            bio: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            avt_path: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            timestamp: false,
        },
    );
    return Users;
};
