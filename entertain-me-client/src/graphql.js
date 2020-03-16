import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import { store } from './stores';
import {
  addMovie,
  updateMovie,
  deleteMovie
} from './resolvers/moviesResolvers';
import {
  addTvSeries,
  updateTvSeries,
  deleteTvSeries
} from './resolvers/tvSeriesResolvers';

const history = createBrowserHistory();

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
        addMovie,
        updateMovie,
        deleteMovie,
        addTvSeries,
        updateTvSeries,
        deleteTvSeries
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
