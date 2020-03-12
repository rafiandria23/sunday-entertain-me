'use strict';

const Redis = require('ioredis');
const redis = new Redis();
const axios = require('axios').default;

const moviesApi = axios.create({ baseURL: 'http://localhost:3001' });

class MoviesController {
  static async create(req, res, next) {
    try {
      const movieData = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      };
      const { data } = await moviesApi.post('/movies', movieData);
      redis.del('movies');
      res.status(201).json({ result: data.result });
    } catch (err) {
      next(err);
    }
  }

  static async findAll(req, res, next) {
    try {
      const movies = await redis.get('movies');
      const parsedMovies = JSON.parse(movies);
      if (!parsedMovies || Object.keys(parsedMovies).length === 0) {
        const { data } = await moviesApi.get('/movies');
        redis.set('movies', JSON.stringify(data.result));
        res.status(200).json({ movies: data.result });
      } else {
        res.status(200).json({ movies: parsedMovies });
      }
    } catch (err) {
      next(err);
    }
  }

  static async findOne(req, res, next) {
    try {
      const movieId = req.params.movieId;
      const currentMovies = await redis.get('currentMovies');
      const currentMoviesParsed = JSON.parse(currentMovies);
      if (
        !currentMoviesParsed ||
        Object.keys(currentMoviesParsed).length === 0
      ) {
        const { data } = await moviesApi.get(`/movies/${movieId}`);
        const foundMovie = data.result;
        redis.set('currentMovies', JSON.stringify([].push(foundMovie)));
        res.status(200).json({ movies: foundMovie });
      } else {
        const currentMovieToShow = currentMoviesParsed.filter(
          movie => movie._id === movieId
        )[0];
        if (!currentMovieToShow) {
          const { data } = await moviesApi.get(`/movies/${movieId}`);
          redis.set(
            'currentMovies',
            JSON.stringify(currentMoviesParsed.push(data.result))
          );
          res.status(200).json({ movies: currentMovieToShow });
        } else {
          res.status(200).json({ movies: currentMovieToShow });
        }
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateOne(req, res, next) {
    try {
      const movieId = req.params.movieId;
      const movieData = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      };
      const { data } = await moviesApi.put(`/movies/${movieId}`, movieData);
      redis.del('movies');
      res.status(200).json({ movies: data.result });
    } catch (err) {
      next(err);
    }
  }

  static async destroy(req, res, next) {
    try {
      const movieId = req.params.movieId;
      const { data } = await moviesApi.delete(`/movies/${movieId}`);
      redis.del('movies');
      res.status(200).json({ movies: data.result });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MoviesController;
