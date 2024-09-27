module.exports = (app) => {
    const UsersService = require('../service/user.service');
    var router = require('express').Router();
    router.post('/loggin', UsersService.authenticate);
    router.post('/register', UsersService.create);
    router.post('/survey', UsersService.update);
    
    app.use('/', router);
};
