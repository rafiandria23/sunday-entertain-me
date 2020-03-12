'use strict';

class MovieController {
  static async create(req, res, next) {
    try {
      const db = req.db;
      const tags = req.body.tags.split(', ');
      const movieData = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags
      };
      const result = await db.collection('Movies').insertOne(movieData);
      res.status(201).json({ result: { ...result, ...movieData } });
    } catch (err) {
      next(err);
    }
  }

  static async findAll(req, res, next) {
    try {
      const db = req.db;
      const result = await db
        .collection('Movies')
        .find({})
        .toArray();
      res.status(200).json({ result });
    } catch (err) {
      next(err);
    }
  }

  static async findOne(req, res, next) {
    try {
      const db = req.db;
      const ObjectId = req.ObjectId;
      const movieId = req.params.movieId;
      const movies = db.collection('Movies');
      const result = await movies.findOne({ _id: ObjectId(movieId) });
      res.status(200).json({ result });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const db = req.db;
      const ObjectId = req.ObjectId;
      const movieId = req.params.movieId;
      const tags = req.body.tags.split(', ');
      const movieData = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags
      };
      const movies = db.collection('Movies');
      const result = await movies.findOneAndUpdate(
        { _id: ObjectId(movieId) },
        { $set: movieData },
        { returnNewDocument: true }
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
      const movieId = req.params.movieId;
      const movies = db.collection('Movies');
      const result = await movies.findOneAndDelete(
        { _id: ObjectId(movieId) },
        { returnOriginal: true }
      );
      res.status(200).json({ result });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MovieController;
