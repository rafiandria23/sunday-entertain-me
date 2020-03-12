"use strict";

class MovieController {
  static async create(req, res, next) {
    try {
      const db = req.db;
      const movieData = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      };
      const result = await db.collection("Movies").insertOne(movieData);
      res.status(201).json({ result });
    } catch (err) {
      next(err);
    }
  }

  static async findAll(req, res, next) {}

  static async findOne(req, res, next) {}

  static async update(req, res, next) {
    try {
      const db = req.db;
      const id = req.ObjectId;
      const movieId = +req.params.movieId;
      const movieData = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      };
      const col = db.collection("Movies");
      const result = await col.updateOne({ _id: id(movieId) });
    } catch (err) {
      next(err);
    }
  }

  static async destroy(req, res, next) {}
}

module.exports = MovieController;
