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
