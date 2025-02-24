module.exports = (app) => {
    const ReviewsService = require('../service/review.service');
    var router = require('express').Router();
    router.post('/create-review', ReviewsService.create);
    router.get('/get-all-review', ReviewsService.getAllReviews);

    app.use('/', router);
};
