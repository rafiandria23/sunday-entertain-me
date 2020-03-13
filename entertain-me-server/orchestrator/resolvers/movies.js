'use strict';

const moviesApi = require('axios').default.create({
  baseURL: `http://localhost:3001`
});

const moviesQueryResolver = {
  movies: async () => {
    try {
      const { data } = await moviesApi.get('/movies');
      return data.result;
    } catch (err) {
      return err;
    }
  },
  findOneMovie: async (_, { movieId }) => {
    try {
      const { data } = await moviesApi.get(`/movies/${movieId}`);
      return data.result;
    } catch (err) {
      return err;
    }
  }
};

const moviesMutationResolver = {
  addMovie: async (_, args) => {
    try {
      const newMovieData = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags
      };
      const { data } = await moviesApi.post('/movies', newMovieData);
      return data.result;
    } catch (err) {
      return err;
    }
  },
  updateMovie: async (_, args) => {
    try {
      const movieId = args.movieId;
      const movieUpdateData = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags
      };
      const { data } = await moviesApi.put(
        `/movies/${movieId}`,
        movieUpdateData
      );
      return data.result.value;
    } catch (err) {
      return err;
    }
  },
  deleteMovie: async (_, args) => {
    try {
      const movieId = args.movieId;
      const { data } = await moviesApi.delete(`/movies/${movieId}`);
      return data.result.value;
    } catch (err) {
      return err;
    }
  }
};

module.exports = {
  moviesQueryResolver,
  moviesMutationResolver
};
