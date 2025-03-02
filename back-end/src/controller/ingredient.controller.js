module.exports = (app) => {
    const IngredientsService = require('../service/ingredient.service');
    var router = require('express').Router();

    router.post('/create-ingredient', IngredientsService.create);
    router.get('/get-all-ingredients', IngredientsService.getAll);
    router.get('/get-ingredient/:ingredientId', IngredientsService.getById);
    router.put('/update-ingredient/:ingredientId', IngredientsService.updateIngredientById);
    router.delete('/delete-ingredient/:ingredientId', IngredientsService.deleteIngredientById);

    app.use('/', router);
};
