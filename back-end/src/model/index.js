const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require('./user.model')(sequelize, Sequelize);
db.Products = require('./products.model')(sequelize, Sequelize);
db.Ingredients = require('./ingredients.model')(sequelize, Sequelize);
db.Product_reviews = require('./product_reviews.model')(sequelize, Sequelize);
db.Comments = require('./comments.model')(sequelize, Sequelize);
db.Articles = require('./articles.model')(sequelize, Sequelize);
db.Reviews = require('./review.model')(sequelize, Sequelize);

//table relationship
//Products
db.Products.belongsTo(db.Ingredients, {
    foreignKey: 'ingredient_id',
});
db.Ingredients.hasMany(db.Products, {
    foreignKey: 'ingredient_id',
});

//Product_reviews

db.Products.hasMany(db.Product_reviews, {
    foreignKey: 'product_id',
});
db.Products.belongsTo(db.Product_reviews, {
    foreignKey: 'product_id',
});

db.Users.belongsTo(db.Product_reviews, {
    foreignKey: 'user_id',
});
db.Users.hasMany(db.Product_reviews, {
    foreignKey: 'user_id',
});

db.Comments.belongsTo(db.Product_reviews, {
    foreignKey: 'review_id',
});
db.Product_reviews.hasMany(db.Comments, {
    foreignKey: 'review_id',
});

//Article
db.Users.belongsTo(db.Articles, {
    foreignKey: 'user_id',
});
db.Users.hasMany(db.Articles, {
    foreignKey: 'user_id',
});
// Reviews
db.Reviews.belongsTo(db.Users, {
    foreignKey: 'user_id',
});
db.Users.hasMany(db.Reviews, {
    foreignKey: 'user_id',
});

module.exports = db;
