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
