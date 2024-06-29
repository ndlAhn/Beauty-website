const {DataTypes} = require('sequelize')
module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("comments", {
        comment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        create_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },

    },
    
    )
    return Comments;
};