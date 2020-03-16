import { gql } from 'apollo-boost';

export const ALL_TV_SERIES = gql`
  {
    tvSeries @client {
      _id
      title
      overview
      poster_path
      popularity
    }
  }
`;

export const FETCH_ALL_TV_SERIES = gql`
  query {
    tvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const FIND_ONE_TV_SERIES = gql`
  query FindOneTvSeries($_id: ID!) {
    findOneTvSeries(tvSeriesId: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const ADD_TV_SERIES = gql`
  mutation AddTvSeries(
    $title: String!
    $overview: String!
    $poster_path: String
    $popularity: Float
    $tags: String
  ) {
    addTvSeries(
      title: $title
      overview: $overview
      poster_path: $poster_path
      popularity: $popularity
      tags: $tags
    ) {
      addTvSeries(
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

export const UPDATE_TV_SERIES = gql`
  mutation UpdateMovie(
    $_id: ID!
    $title: String!
    $overview: String!
    $poster_path: String
    $popularity: Float
    $tags: String
  ) {
    updateTvSeries(
      tvSeriesId: $_id
      title: $title
      overview: $overview
      poster_path: $poster_path
      popularity: $popularity
      tags: $tags
    ) {
      updateTvSeries(
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

export const DELETE_TV_SERIES = gql`
  mutation DeleteTvSeries($_id: ID!) {
    deleteTvSeries(tvSeries: $_id) {
      deleteTvSeries(_id: _id) @client
    }
  }
`;
