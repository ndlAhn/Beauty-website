const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Ingredients = sequelize.define(
        'ingredients',
        {
            ingredient_id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            ingredient_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ingredient_description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            timestamp: false,
        },
    );
    return Ingredients;
};
