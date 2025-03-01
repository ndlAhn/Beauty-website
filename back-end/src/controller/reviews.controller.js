module.exports = (app) => {
    const ReviewsService = require('../service/review.service');
    var router = require('express').Router();
    router.post('/create-review', ReviewsService.create);
    router.get('/get-all-reviews', ReviewsService.getAllReviews);
    router.post('/get-review-by-user-id', ReviewsService.getReviewByUserId);
    router.delete('/delete-review/:reviewId', ReviewsService.deleteReviewById);
    router.put('/update-review/:reviewId', ReviewsService.updateReviewById);
    app.use('/', router);
};
