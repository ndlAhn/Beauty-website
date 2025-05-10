module.exports = (app) => {
    const FollowerService = require('../service/follower.service');
    var router = require('express').Router();
    router.post('/follow', FollowerService.followUser);
    router.post('/unfollow', FollowerService.unfollowUser);
    router.get('/followers/:userId', FollowerService.getFollowersByUser);
    router.get('/following/:userId', FollowerService.getFollowingByUser);
    router.get('/check-follow/:userId/:targetUserId', FollowerService.checkFollowStatus);
    app.use('/api/followers', router);
};
