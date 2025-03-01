const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Reviews = sequelize.define(
        'review',
        {
            review_id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },

            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            introduction: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            packaging: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            ingredients: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            uses: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            target_user: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            review: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            pros: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            cons: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            guide: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            conclusion: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            img_path: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            timestamps: true,
        },
    );

    return Reviews;
};
