'use strict';

const { mergeSchemas } = require('graphql-tools');

const moviesSchema = require('./movies');
const tvSeriesSchema = require('./tvSeries');

const mergedSchemas = mergeSchemas({
  schemas: [moviesSchema, tvSeriesSchema]
});

module.exports = mergedSchemas;
