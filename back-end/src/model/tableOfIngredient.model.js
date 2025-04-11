const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const TableOfIngredient = sequelize.define('table_of_ingredient', {
        table__of_ingreddient_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
    });
    return TableOfIngredient;
};
