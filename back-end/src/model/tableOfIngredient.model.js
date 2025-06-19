const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const TableOfIngredient = sequelize.define('table_of_ingredient', {
        table_of_ingredient_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
    });
    return TableOfIngredient;
};
