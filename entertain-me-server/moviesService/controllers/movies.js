'use strict';

const axios = require('axios').default;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

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

  static async seedMovies(req, res, next) {
    try {
      const db = req.db;
      const {
        data: { genres }
      } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`
      );
      const {
        data: { results }
      } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&region=US`
      );

      const movies = results.map(movie => {
        const tags = movie.genre_ids.map(tag => {
          return genres
            .filter(genre => genre.id === tag)
            .map(genre => genre.name)[0];
        });
        return {
          title: movie.title,
          overview: movie.overview,
          poster_path: movie.poster_path,
          popularity: movie.popularity,
          tags
        };
      });

      const result = await db.collection('Movies').insertMany(movies);
      res.status(201).json({ result: movies });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MovieController;
