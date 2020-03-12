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
      const movies = JSON.parse(redis.get('movies'));
      if (!movies || Object.keys(movies).length === 0) {
        const { data } = await moviesApi.get('/movies');
        redis.set('movies', JSON.stringify(data.result));
        res.status(200).json({ movies: data.result });
      } else {
        res.status(200).json({ movies });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MoviesController;
