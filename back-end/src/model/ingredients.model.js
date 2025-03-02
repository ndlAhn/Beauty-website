const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Ingredients = sequelize.define(
        'ingredients',
        {
            ingredient_id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            function: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            safety: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            timestamps: false, // Không cần `createdAt`, `updatedAt`
        },
    );

    return Ingredients;
};
