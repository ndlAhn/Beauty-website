const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define(
        'products',
        {
            product_id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            product_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            brand: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            product_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            skin_type: {
                type: DataTypes.ENUM('oily', 'dry', 'normal', 'combination', 'sensitive', 'all'),
                allowNull: false,
            },
            skin_problem: {
                type: DataTypes.ENUM('acne', 'aging', 'dried', 'oily', 'enlarged pores', 'scarring', 'skin recovery'),
                allowNull: false,
            },

            price_range: {
                type: DataTypes.ENUM('drugstore', 'midrange', 'highend'),
                allowNull: false,
            },
            capacity: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            uses: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            warning: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            product_description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            timestamps: true,
        },
    );

    return Products;
};
