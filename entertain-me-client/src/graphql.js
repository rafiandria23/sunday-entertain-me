import React from 'react';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import store from './stores';

const client = new ApolloClient({
  uri: 'http://localhost:4000'
});

export const wrappedRender = component => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>{component}</Provider>
    </ApolloProvider>
  );
};
