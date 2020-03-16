import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import { store } from './stores';

const history = createBrowserHistory();

const ALL_MOVIES = gql`
  {
    movies @client {
      title
      overview
      poster_path
      popularity
    }
  }
`;

// const ALL_TV_SERIES = gql`
//   tvSeries @client {
//     title
//     overview
//     poster_path
//     popularity
//   }
// `;

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  clientState: {
    resolvers: {
      Mutation: {
        addMovie(_, variable, client) {
          const { movies } = client.cache.readQuery({ query: ALL_MOVIES });
          const newMovie = {
            __typename: 'Movie',
            title: variable.title,
            overview: variable.overview,
            poster_path: variable.poster_path,
            popularity: variable.popularity
          };
          const newMovies = movies.concat(newMovie);
          client.cache.writeData({
            data: {
              movies: newMovies
            }
          });
          return newMovie;
        }
      },

      defaults: {
        movies: [],
        tvSeries: []
      }
    }
  }
});

export const wrappedRender = component => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router history={history}>{component}</Router>
      </Provider>
    </ApolloProvider>
  );
};
