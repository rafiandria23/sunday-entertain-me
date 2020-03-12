'use strict';

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
}

module.exports = TvSeriesController;
