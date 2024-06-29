const {DataTypes} = require('sequelize')
module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define("products", {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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

        },
        skin_problem: {

        },
        age_group: {

        },
        product_type: {

        },
        price_range: {
            
        },

        product_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        timestamp: false,
    }
    )
    return Products;
};