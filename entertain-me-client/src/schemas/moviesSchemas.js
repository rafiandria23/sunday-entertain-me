import { gql } from 'apollo-boost';

export const ALL_MOVIES = gql`
  {
    movies @client {
      _id
      title
      overview
      poster_path
      popularity
    }
  }
`;

export const FETCH_ALL_MOVIES = gql`
  query {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const FIND_ONE_MOVIE = gql`
  query FindOneMovie($_id: ID!) {
    findOneMovie(movieId: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation AddMovie(
    $title: String!
    $overview: String!
    $poster_path: String
    $popularity: Float
    $tags: String
  ) {
    addMovie(
      title: $title
      overview: $overview
      poster_path: $poster_path
      popularity: $popularity
      tags: $tags
    ) {
      addMovie(
        _id: _id
        title: title
        overview: overview
        poster_path: poster_path
        popularity: popularity
        tags: tags
      ) @client
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie(
    $_id: ID!
    $title: String!
    $overview: String!
    $poster_path: String
    $popularity: Float
    $tags: String
  ) {
    updateMovie(
      movieId: $_id
      title: $title
      overview: $overview
      poster_path: $poster_path
      popularity: $popularity
      tags: $tags
    ) {
      updateMovie(
        _id: _id
        title: title
        overview: overview
        poster_path: poster_path
        popularity: popularity
        tags: tags
      ) @client
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation DeleteMovie($_id: ID!) {
    deleteMovie(movieId: $_id) {
      deleteMovie(_id: _id) @client
    }
  }
`;
