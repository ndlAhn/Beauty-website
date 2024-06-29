const {DataTypes} = require('sequelize')
module.exports = (sequelize, Sequelize) => {
    const Articles = sequelize.define("articles", {
        article_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        img_url: {
            type: DataTypes.STRING, 
            allowNull: true,
        },
        article_category: {
            type: DataTypes.ENUM({
                values: ['', 'another value']}),
        },
        publish_at: {
            type: DataTypes.DATE, 
            allowNull: false,
        },
        source_name: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        create_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },

    },
    
    )
    return Articles;
};