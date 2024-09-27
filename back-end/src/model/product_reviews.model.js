const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Product_reviews = sequelize.define('product_reviews', {
        review_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pros: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cons: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        create_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    });
    return Product_reviews;
};
