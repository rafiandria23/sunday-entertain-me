import React, { useState } from 'react';
import { TextField, Typography, Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import {
  UPDATE_TV_SERIES,
  DELETE_TV_SERIES
} from '../../schemas/tvSeriesSchemas';
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
  const { tvSeriesId } = useParams();
  const history = useHistory();
  const { tvSeriesData, refetchTvSeries } = props;
  const [title, setTvSeriesTitle] = useState(tvSeriesData.title);
  const [overview, setTvSeriesOverview] = useState(tvSeriesData.overview);
  // change below to FLOAT DATA TYPE!!
  const [popularity, setTvSeriesPopularity] = useState(tvSeriesData.popularity);
  const [poster_path, setPosterPath] = useState(tvSeriesData.poster_path);
  const [tags, setTags] = useState(tvSeriesData.tags.join(', '));
  const [updateTvSeries] = useMutation(UPDATE_TV_SERIES);
  const [deleteTvSeries] = useMutation(DELETE_TV_SERIES);

  const handleTitleChange = e => {
    setTvSeriesTitle(e.target.value);
  };

  const handlePosterPathChange = e => {
    setPosterPath(e.target.value);
  };

  const handleOverviewChange = e => {
    setTvSeriesOverview(e.target.value);
  };

  const handlePopularityChange = e => {
    setTvSeriesPopularity(e.target.value);
  };

  const handleTagsChange = e => {
    setTags(e.target.value);
  };

  const handleUpdateTvSeries = async e => {
    e.preventDefault();
    const updateTvSeriesData = {
      _id: tvSeriesId,
      title,
      overview,
      popularity: parseFloat(popularity),
      poster_path,
      tags
    };
    updateTvSeries({ variables: updateTvSeriesData });
    await refetchTvSeries();
    history.push('/tv');
  };

  const handleDeleteTvSeries = async e => {
    deleteTvSeries({
      variables: {
        _id: tvSeriesId
      }
    });
    await refetchTvSeries();
    history.push('/tv');
  };

  return (
    <Container>
      <form
        className={classes.root}
        validate='true'
        autoComplete='on'
        onSubmit={handleUpdateTvSeries}
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
          onClick={handleDeleteTvSeries}
        >
          Delete TV Series
        </Button>
      </div>
    </Container>
  );
};
