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

            skin_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            skin_problem: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            age_group: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            product_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price_range: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            product_description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            timestamp: false,
        },
    );
    return Products;
};
