'use strict';

const movieRouter = require('express').Router();
const MovieController = require('../controllers/movies');

movieRouter.get('/', MovieController.findAll);
movieRouter.get('/seed', MovieController.seedMovies);
movieRouter.get('/:movieId', MovieController.findOne);
movieRouter.post('/', MovieController.create);
movieRouter.put('/:movieId', MovieController.update);
movieRouter.delete('/:movieId', MovieController.destroy);

module.exports = movieRouter;
