module.exports = (app) => {
    const ProductService = require('../service/product.service');
    var router = require('express').Router();

    router.post('/create-product', ProductService.create);
    router.get('/get-all-products', ProductService.getAll);
    router.post('/get-products-by-name', ProductService.getProductsByName);
    router.get('/product-detail/:productId', ProductService.getById);
    router.put('/update-product/:productId', ProductService.update);
    router.delete('/delete-product/:productId', ProductService.delete);

    app.use('/', router);
};
