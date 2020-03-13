'use strict';

const tvSeriesApi = require('axios').default.create({
  baseURL: `http://localhost:3002`
});

const tvSeriesQueryResolver = {
  tvSeries: async () => {
    try {
      const { data } = await tvSeriesApi.get('/tv');
      return data.result;
    } catch (err) {
      return err;
    }
  },
  findOneTvSeries: async (_, { tvSeriesId }) => {
    try {
      const { data } = await tvSeriesApi.get(`/tv/${tvSeriesId}`);
      return data.result;
    } catch (err) {
      return err;
    }
  }
};

const tvSeriesMutationResolver = {
  addTvSeries: async (_, args, context, info) => {
    try {
      const newTvSeriesData = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags
      };
      const { data } = await tvSeriesApi.post('/tv', newTvSeriesData);
      return data.result;
    } catch (err) {
      return err;
    }
  },
  updateTvSeries: async (_, args) => {
    try {
      const tvSeriesId = args.tvSeriesId;
      const tvSeriesUpdateData = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags
      };
      const { data } = await tvSeriesApi.put(
        `/tv/${tvSeriesId}`,
        tvSeriesUpdateData
      );
      return data.result.value;
    } catch (err) {
      return err;
    }
  },
  deleteTvSeries: async (_, args) => {
    try {
      const tvSeriesId = args.tvSeriesId;
      const { data } = await tvSeriessApi.delete(`/movies/${tvSeriesId}`);
      return data.result.value;
    } catch (err) {
      return err;
    }
  }
};

module.exports = {
  tvSeriesQueryResolver,
  tvSeriesMutationResolver
};
