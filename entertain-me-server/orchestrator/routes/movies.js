'use strict';

const moviesRouter = require('express').Router();

const { MoviesController } = require('../controllers');

moviesRouter.get('/', MoviesController.findAll);
moviesRouter.get('/:movieId', MoviesController.findOne);
moviesRouter.post('/', MoviesController.create);
moviesRouter.put('/:movieId', MoviesController.updateOne);
moviesRouter.delete('/:movieId', MoviesController.destroy);

module.exports = moviesRouter;
