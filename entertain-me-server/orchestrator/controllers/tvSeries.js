'use strict';

const Redis = require('ioredis');
const redis = new Redis();
const axios = require('axios').default;

const tvSeriesApi = axios.create({ baseURL: 'http://localhost:3002' });

class TvSeriesController {
  static async create(req, res, next) {
    try {
      const tvSeriesData = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      };
      const { data } = await tvSeriesApi.post('/tv', tvSeriesData);
      redis.del('tvSeries');
      res.status(201).json({ result: data.result });
    } catch (err) {
      next(err);
    }
  }

  static async findAll(req, res, next) {
    try {
      const tvSeries = await redis.get('tvSeries');
      const tvSeriesParsed = JSON.parse(tvSeries);
      if (!tvSeriesParsed || Object.keys(tvSeriesParsed).length === 0) {
        const { data } = await tvSeriesApi.get('/tv');
        redis.set('tvSeries', JSON.stringify(data.result));
        res.status(200).json({ tvSeries: data.result });
      } else {
        res.status(200).json({ tvSeries: tvSeriesParsed });
      }
    } catch (err) {
      next(err);
    }
  }

  static async findOne(req, res, next) {
    try {
      const tvSeriesId = req.params.tvSeriesId;
      const currentTvSeries = await redis.get('currentTvSeries');
      const currentTvSeriesParsed = JSON.parse(currentTvSeries);
      if (
        !currentTvSeriesParsed ||
        Object.keys(currentTvSeriesParsed).length === 0
      ) {
        const { data } = await tvSeriesApi.get(`/tv/${tvSeriesId}`);
        const foundTvSeries = data.result;
        redis.set('currentTvSeries', JSON.stringify([].push(foundTvSeries)));
        res.status(200).json({ movies: foundTvSeries });
      } else {
        const currentTvSeriesToShow = currentTvSeriesParsed.filter(
          tvSeries => tvSeries._id === tvSeriesId
        )[0];
        if (!currentTvSeriesToShow) {
          const { data } = await tvSeriesApi.get(`/tv/${tvSeriesId}`);
          redis.set(
            'currentTvSeries',
            JSON.stringify(currentTvSeriesParsed.push(data.result))
          );
          res.status(200).json({ tvSeries: currentTvSeriesToShow });
        } else {
          res.status(200).json({ tvSeries: currentTvSeriesToShow });
        }
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateOne(req, res, next) {
    try {
      const tvSeriesId = req.params.tvSeriesId;
      const tvSeriesData = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      };
      const { data } = await tvSeriesApi.put(`/tv/${tvSeriesId}`, tvSeriesData);
      redis.del('tvSeries');
      res.status(200).json({ tvSeries: data.result });
    } catch (err) {
      next(err);
    }
  }

  static async destroy(req, res, next) {
    try {
      const tvSeriesId = req.params.tvSeriesId;
      const { data } = await tvSeriesApi.delete(`/tv/${tvSeriesId}`);
      redis.del('tvSeries');
      res.status(200).json({ tvSeries: data.result });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TvSeriesController;
