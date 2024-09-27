module.exports = (app) => {
    const UsersService = require('../service/user.service');
    var router = require('express').Router();
    router.post('/log-in', UsersService.authenticate);
    router.post('/register', UsersService.create);

    app.use('/', router);
};
