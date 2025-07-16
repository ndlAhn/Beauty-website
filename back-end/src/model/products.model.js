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
                type: DataTypes.STRING, // e.g. 'Facial Mask', 'Moisturizer', etc.
                allowNull: false,
            },

            // Skin problems and goals (unified with user model)
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

            skin_types: {
                type: DataTypes.JSON, // Array of skin types: ['normal', 'dry', 'oily', 'combination', 'sensitive']
                allowNull: false,
                defaultValue: [],
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
