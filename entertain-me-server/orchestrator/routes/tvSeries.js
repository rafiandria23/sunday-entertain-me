'use strict';

const tvSeriesRouter = require('express').Router();

const { TvSeriesController } = require('../controllers');

tvSeriesRouter.get('/', TvSeriesController.findAll);
tvSeriesRouter.get('/:tvSeriesId', TvSeriesController.findOne);
tvSeriesRouter.post('/', TvSeriesController.create);
tvSeriesRouter.put('/:tvSeriesId', TvSeriesController.updateOne);
tvSeriesRouter.delete('/:tvSeriesId', TvSeriesController.destroy);

module.exports = tvSeriesRouter;
