import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import {
  Header,
  MovieList,
  MovieDetail,
  TvSeriesList,
  TvSeriesDetail
} from './components';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: '20vh'
  }
}));

function App() {
  const classes = useStyles();
  const searchQuery = useSelector(state => state.searchQuery);

  return (
    <>
      <Header />

      <Container className={classes.mainContainer}>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/movies' />
          </Route>

          <Route path='/movies/:movieId'>
            <MovieDetail />
          </Route>

          <Route path='/movies'>
            <MovieList searchQuery={searchQuery} />
          </Route>

          <Route path='/tv/:tvSeriesId'>
            <TvSeriesDetail />
          </Route>

          <Route path='/tv'>
            <TvSeriesList searchQuery={searchQuery} />
          </Route>
        </Switch>
      </Container>
    </>
  );
}

export default App;
