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
            non_comedogenic: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            hypoallergenic: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            fragrance_free: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            dermatologically_tested: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            alcohol_free: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            sulphate_free: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            cruelty_free: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            vegan: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            safe_for_pregnancy: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            timestamps: false, // Không cần `createdAt`, `updatedAt`
        },
    );

    return Ingredients;
};
