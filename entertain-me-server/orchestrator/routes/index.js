'use strict';

const indexRouter = require('express').Router();

const { MainController } = require('../controllers');
const moviesRouter = require('./movies');
const tvSeriesRouter = require('./tvSeries');

indexRouter.get('/', MainController.showAll);
indexRouter.use('/movies', moviesRouter);
indexRouter.use('/tv', tvSeriesRouter);

module.exports = indexRouter;
