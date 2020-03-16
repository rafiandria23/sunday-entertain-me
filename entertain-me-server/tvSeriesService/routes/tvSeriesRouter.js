'use strict';

const tvSeriesRouter = require('express').Router();
const TvSeriesController = require('../controllers/tvSeries');

tvSeriesRouter.get('/', TvSeriesController.findAll);
tvSeriesRouter.get('/seed', TvSeriesController.seedTvSeries);
tvSeriesRouter.get('/:tvSeriesId', TvSeriesController.findOne);
tvSeriesRouter.post('/', TvSeriesController.create);
tvSeriesRouter.put('/:tvSeriesId', TvSeriesController.update);
tvSeriesRouter.delete('/:tvSeriesId', TvSeriesController.destroy);

module.exports = tvSeriesRouter;
