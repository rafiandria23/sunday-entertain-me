import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Fab, Paper, CircularProgress } from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import AddMovieForm from './AddMovieForm';
import MovieItem from './MovieItem';
import { FETCH_ALL_MOVIES } from '../../schemas/moviesSchemas';

const useStyles = makeStyles(theme => ({
  moviesList: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: '10vh auto'
  },
  customFab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  },
  addMovieForm: {
    margin: 0,
    padding: 20,
    top: 'auto',
    right: 20,
    bottom: 100,
    left: 'auto',
    position: 'fixed'
  }
}));

export default props => {
  const classes = useStyles();
  const [addMovieForm, setAddMovieForm] = useState(false);
  const { loading, error, data, refetch } = useQuery(FETCH_ALL_MOVIES);

  const handleAddMovieForm = () => {
    setAddMovieForm(!addMovieForm);
  };

  if (loading) {
    return (
      <div className={classes.moviesList}>
        <CircularProgress />
      </div>
    );
  }

  const handleRender = () => {
    const { searchQuery } = props;
    if (searchQuery.length > 0) {
      const filteredMovies = data.movies.filter(movie => {
        return movie.tags
          .join(', ')
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
      return filteredMovies.map(movie => {
        return <MovieItem key={movie._id} movieData={movie} />;
      });
    } else {
      return data.movies.map(movie => {
        return <MovieItem key={movie._id} movieData={movie} />;
      });
    }
  };

  const closeAddMovieForm = () => {
    setAddMovieForm(false);
  };

  return (
    <>
      <div className={classes.moviesList} onMouseDown={closeAddMovieForm}>
        {handleRender()}
      </div>
      {!addMovieForm && (
        <Fab
          className={classes.customFab}
          onClick={handleAddMovieForm}
          color='primary'
        >
          <AddIcon />
        </Fab>
      )}
      {addMovieForm && (
        <Fab
          className={classes.customFab}
          onClick={handleAddMovieForm}
          color='primary'
        >
          <RemoveIcon onClick={handleAddMovieForm} />
        </Fab>
      )}
      {addMovieForm && (
        <Paper elevation={5} className={classes.addMovieForm}>
          <AddMovieForm
            refetchMovies={refetch}
            handleAddMovieForm={handleAddMovieForm}
          />
        </Paper>
      )}
    </>
  );
};
