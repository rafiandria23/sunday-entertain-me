'use strict';

const Redis = require('ioredis');
const redis = new Redis();
const axios = require('axios').default;

const moviesApi = axios.create({ baseURL: 'http://localhost:3001' });
const tvSeriesApi = axios.create({ baseURL: 'http://localhost:3002' });

const MoviesController = require('./movies');
const TvSeriesController = require('./tvSeries');

class MainController {
  static async showAll(req, res, next) {
    try {
      const movies = await redis.get('movies');
      const tvSeries = await redis.get('tvSeries');
      let moviesParsed = JSON.parse(movies);
      let tvSeriesParsed = JSON.parse(tvSeries);
      if (!moviesParsed || moviesParsed.length === 0) {
        const { data } = await moviesApi.get('/movies');
        redis.set('movies', JSON.stringify([...data.result]));
        moviesParsed.concat([...data.result]);
      } else if (!tvSeriesParsed || tvSeriesParsed.length === 0) {
        const { data } = await tvSeriesApi.get('/tv');
        redis.set('tvSeries', JSON.stringify([...data.result]));
        tvSeriesParsed = [...data.result];
      }
      res
        .status(200)
        .json({ result: { movies: moviesParsed, tvSeries: tvSeriesParsed } });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  MoviesController,
  TvSeriesController,
  MainController
};
