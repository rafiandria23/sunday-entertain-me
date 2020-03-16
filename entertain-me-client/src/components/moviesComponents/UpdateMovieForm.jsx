import React, { useState } from 'react';
import { TextField, Typography, Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { UPDATE_MOVIE, DELETE_MOVIE } from '../../schemas/moviesSchemas';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignContent: 'center'
    }
  },
  deleteButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

export default props => {
  const classes = useStyles();
  const { movieId } = useParams();
  const history = useHistory();
  const { movieData, refetchMovies } = props;
  const [title, setMovieTitle] = useState(movieData.title);
  const [overview, setMovieOverview] = useState(movieData.overview);
  // change below to FLOAT DATA TYPE!!
  const [popularity, setMoviePopularity] = useState(movieData.popularity);
  const [poster_path, setPosterPath] = useState(movieData.poster_path);
  const [tags, setTags] = useState(movieData.tags.join(', '));
  const [updateMovie] = useMutation(UPDATE_MOVIE);
  const [deleteMovie] = useMutation(DELETE_MOVIE);

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

  const handleUpdateMovie = e => {
    e.preventDefault();
    const updateMovieData = {
      _id: movieId,
      title,
      overview,
      popularity: parseFloat(popularity),
      poster_path,
      tags
    };
    updateMovie({ variables: updateMovieData });
    refetchMovies();
    history.push('/movies');
  };

  const handleDeleteMovie = e => {
    deleteMovie({
      variables: {
        _id: movieId
      }
    });
    refetchMovies();
    history.push('/movies');
  };

  return (
    <Container>
      <form
        className={classes.root}
        validate='true'
        autoComplete='on'
        onSubmit={handleUpdateMovie}
      >
        <Typography variant='h5'>{title}</Typography>

        <TextField
          label='Title'
          variant='outlined'
          onChange={handleTitleChange}
          value={title}
        />

        <TextField
          label='Overview'
          variant='outlined'
          onChange={handleOverviewChange}
          value={overview}
        />

        <TextField
          label='Popularity'
          variant='outlined'
          onChange={handlePopularityChange}
          value={popularity}
        />

        <TextField
          label='Poster URL'
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
          Update Movie
        </Button>
      </form>
      <div className={classes.deleteButtonContainer}>
        <Button
          variant='outlined'
          color='secondary'
          onClick={handleDeleteMovie}
        >
          Delete Movie
        </Button>
      </div>
    </Container>
  );
};
