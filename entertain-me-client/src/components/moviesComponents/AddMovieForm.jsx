import React, { useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { ADD_MOVIE } from '../../schemas/moviesSchemas';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignContent: 'center'
    }
  }
}));

export default props => {
  const classes = useStyles();
  const [title, setMovieTitle] = useState('');
  const [overview, setMovieOverview] = useState('');
  // change below to FLOAT DATA TYPE!!
  const [popularity, setMoviePopularity] = useState('');
  const [poster_path, setPosterPath] = useState('');
  const [tags, setTags] = useState('');
  const [addMovie] = useMutation(ADD_MOVIE);
  const { refetchMovies, handleAddMovieForm } = props;
  const history = useHistory();

  const handleTitleChange = e => {
    setMovieTitle(e.target.value);
  };

  const handlePosterPathChange = e => {
    setPosterPath(e.target.value);
  };

  const handleOverviewChange = e => {
    setMovieOverview(e.target.value);
  };

  const handlePopularityChange = e => {
    setMoviePopularity(e.target.value);
  };

  const handleTagsChange = e => {
    setTags(e.target.value);
  };

  const handleAddMovie = e => {
    e.preventDefault();
    const addMovieData = {
      title,
      overview,
      popularity: parseFloat(popularity),
      poster_path,
      tags
    };
    addMovie({ variables: addMovieData });
    refetchMovies();
    history.push('/movies');
    handleAddMovieForm();
  };

  return (
    <form className={classes.root} onSubmit={handleAddMovie}>
      <Typography variant='h5'>Add Movie Form</Typography>

      <TextField
        label='Movie Title'
        variant='outlined'
        onChange={handleTitleChange}
        value={title}
      />

      <TextField
        label='Movie Overview'
        variant='outlined'
        onChange={handleOverviewChange}
        value={overview}
      />

      <TextField
        label='Movie Popularity'
        variant='outlined'
        onChange={handlePopularityChange}
        value={popularity}
      />

      <TextField
        label='Movie Poster URL'
        variant='outlined'
        onChange={handlePosterPathChange}
        value={poster_path}
      />

      <TextField
        label='Tags'
        variant='outlined'
        onChange={handleTagsChange}
        value={tags}
      />
      <Button type='submit' variant='contained' color='primary'>
        Add Movie
      </Button>
    </form>
  );
};
