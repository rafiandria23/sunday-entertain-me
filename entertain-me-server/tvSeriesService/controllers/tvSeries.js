'use strict';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const axios = require('axios');

class TvSeriesController {
  static async create(req, res, next) {
    try {
      const db = req.db;
      const tags = req.body.tags.split(', ');
      const tvSeriesData = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags
      };
      const tvSeries = db.collection('TV Series');
      const result = await tvSeries.insertOne(tvSeriesData);
      res.status(201).json({ result });
    } catch (err) {
      next(err);
    }
  }

  static async findAll(req, res, next) {
    try {
      const db = req.db;
      const tvSeries = db.collection('TV Series');
      const result = await tvSeries.find({}).toArray();
      res.status(200).json({ result });
    } catch (err) {
      next(err);
    }
  }

  static async findOne(req, res, next) {
    try {
      const db = req.db;
      const ObjectId = req.ObjectId;
      const tvSeriesId = req.params.tvSeriesId;
      const tvSeries = db.collection('TV Series');
      const result = await tvSeries.findOne({ _id: ObjectId(tvSeriesId) });
      res.status(200).json({ result });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const db = req.db;
      const ObjectId = req.ObjectId;
      const tvSeriesId = req.params.tvSeriesId;
      const tags = req.body.tags.split(', ');
      const tvSeriesData = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags
      };
      const tvSeries = db.collection('TV Series');
      const result = await tvSeries.findOneAndUpdate(
        { _id: ObjectId(tvSeriesId) },
        { $set: tvSeriesData },
        { returnOriginal: false }
      );
      res.status(200).json({ result });
    } catch (err) {
      next(err);
    }
  }

  static async destroy(req, res, next) {
    try {
      const db = req.db;
      const ObjectId = req.ObjectId;
      const tvSeriesId = req.params.tvSeriesId;
      const tvSeries = db.collection('TV Series');
      const result = await tvSeries.findOneAndDelete(
        { _id: ObjectId(tvSeriesId) },
        { returnOriginal: true }
      );
      res.status(200).json({ result });
    } catch (err) {
      next(err);
    }
  }

  static async seedTvSeries(req, res, next) {
    try {
      const db = req.db;
      const {
        data: { genres }
      } = await axios.get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${TMDB_API_KEY}`
      );
      const {
        data: { results }
      } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_API_KEY}&region=US`
      );

      const tvSeries = results.map(tv => {
        const tags = tv.genre_ids
          .map(tag => {
            return genres.filter(genre => genre.id === tag);
          })
          .filter(tag => tag.length > 0)
          .map(tag => {
            return tag[0].name;
          });
        return {
          title: tv.title,
          overview: tv.overview,
          poster_path: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
          popularity: tv.popularity,
          tags
        };
      });

      const result = await db.collection('TV Series').insertMany(tvSeries);
      res.status(201).json({ result: tvSeries });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TvSeriesController;
