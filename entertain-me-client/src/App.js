import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Header, MovieList } from './components';

function App() {
  const searchQuery = useSelector(state => state.searchQuery);

  return (
    <>
      <Header />

      <Switch>
        <Route path='/' exact>
          <Redirect to='/movies' />
        </Route>

        <Route path='/movies'>
          <MovieList searchQuery={searchQuery} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
