'use strict';

const indexRouter = require('express').Router();
const movieRouter = require('./movies');

indexRouter.get('/', (req, res, next) => {
  res.redirect('/movies');
});

indexRouter.use('/movies', movieRouter);

module.exports = indexRouter;
