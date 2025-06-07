const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Alergic = sequelize.define('alergic', {
        alergic_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
    });
    return Alergic;
};
