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
            skin_type: {
                type: DataTypes.ENUM('normal', 'dry', 'oily', 'combination', 'sensitive'),
                allowNull: false, // Skin type is required
                defaultValue: 'normal', // Default skin type
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            avt_file_path: {
                type: DataTypes.STRING,
                allowNull: true, // Avatar is optional
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
                defaultValue: 'admin',
                allowNull: false,
            },
            acne_prone: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            dull_skin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            large_pores: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            uneven: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            dark_spot: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            redness: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            dehydrated: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            wrinkles: {
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