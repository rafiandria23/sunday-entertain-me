'use strict';

const indexRouter = require('express').Router();
const tvSeriesRouter = require('./tvSeriesRouter');

indexRouter.get('/', (req, res, next) => {
  res.redirect('/tv');
});

indexRouter.use('/tv', tvSeriesRouter);

module.exports = indexRouter;
