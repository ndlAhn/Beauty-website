module.exports = (app) => {
    const ProductService = require('../service/product.service');
    var router = require('express').Router();
    router.post('/create-product', ProductService.create);
    router.get('/get-all-product',ProductService.getAll)
    router.post('/get-products-by-name',ProductService.getProductsByName)
    
    app.use('/', router);
};
