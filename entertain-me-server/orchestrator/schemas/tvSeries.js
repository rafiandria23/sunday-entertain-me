'use strict';

const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

const {
  tvSeriesQueryResolver,
  tvSeriesMutationResolver
} = require('../resolvers/tvSeries');

const tvSeriesSchema = makeExecutableSchema({
  typeDefs: gql`
    type TvSeries {
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: String
    }

    type Query {
      tvSeries: [TvSeries]
      findOneTvSeries(tvSeriesId: ID): TvSeries
    }

    type Mutation {
      addTvSeries(
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: String
      ): TvSeries
      updateTvSeries(
        tvSeriesId: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: String
      ): TvSeries
      deleteTvSeries(movieId: ID): TvSeries
    }
  `,
  resolvers: {
    Query: tvSeriesQueryResolver,
    Mutation: tvSeriesMutationResolver
  }
});

module.exports = tvSeriesSchema;
