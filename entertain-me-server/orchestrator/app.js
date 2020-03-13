'use strict';

const moviesApi = require('axios').default.create({
  baseURL: `http://localhost:3001`
});
const tvSeriesApi = require('axios').default.create({
  baseURL: `http://localhost:3002`
});

const { ApolloServer, gql } = require('apollo-server');
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const port = process.env.PORT || 3000;

// const indexRouter = require('./routes');

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }

  type TvSeries {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }

  type Query {
    movies: [Movie]
    tvSeries: [TvSeries]
    findOneMovie(movieId: ID): Movie
  }

  type Mutation {
    addMovie(
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: String
    ): Movie
    addTvSeries(
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: String
    ): TvSeries
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const { data } = await moviesApi.get('/movies');
        return data.result;
      } catch (err) {
        return err;
      }
    },
    tvSeries: async () => {
      try {
        const { data } = await tvSeriesApi.get('/tv');
        return data.result;
      } catch (err) {
        return err;
      }
    },
    findOneMovie: async (_, { movieId }, context, info) => {
      try {
        const { data } = await moviesApi.get(`/movies/${movieId}`);
        return data.result;
      } catch (err) {
        return err;
      }
    }
  },
  Mutation: {
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
    addTvSeries: async (_, args, context, info) => {
      try {
        const newTvSeriesData = {
          title: args.title,
          overview: args.overview,
          poster_path: args.poster_path,
          popularity: args.popularity,
          tags: args.tags
        };
        const { data } = await tvSeriesApi.post('/tv', newTvSeriesData);
        return data.result;
      } catch (err) {
        return err;
      }
    }
  }
};

// app.get('/', (req, res, next) => {
//   res.redirect('/entertainme');
// });

// app.use('/entertainme', indexRouter);

// app.listen(port, () => {
//   console.log(`Entertain ME Server is running on PORT ${port}!`);
// });

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server
  .listen()
  .then(({ url }) => console.log(`Entertain ME Server is running at ${url}`));
