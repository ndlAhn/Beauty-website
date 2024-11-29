module.exports = (app) => {
    const ProductReviewsService = require('../service/productReview.service');
    var router = require('express').Router();
    router.post('/create-product-review', ProductReviewsService.create);
    router.post('/get-review-by-product', ProductReviewsService.getByProductId);
    router.post('/get-user-product-review', ProductReviewsService.getProductReviewsByUserId);
    app.use('/', router);
};
