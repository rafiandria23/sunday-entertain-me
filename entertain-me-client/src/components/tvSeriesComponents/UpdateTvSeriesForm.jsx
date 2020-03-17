import React, { useState } from 'react';
import { TextField, Typography, Button, Card } from '@material-ui/core';
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
  },
  mainContainer: {
    padding: 20
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
    <Card className={classes.mainContainer}>
      <Typography variant='h5'>{title}</Typography>
      <form
        className={classes.root}
        validate='true'
        autoComplete='on'
        onSubmit={handleUpdateTvSeries}
      >
        <TextField
          error={title.length <= 0 ? true : false}
          helperText={title.length <= 0 ? 'Title cannot be empty!' : ''}
          label='Title'
          variant='outlined'
          onChange={handleTitleChange}
          value={title}
          required={true}
          multiline={true}
        />

        <TextField
          error={overview.length <= 0 ? true : false}
          helperText={overview.length <= 0 ? 'Overview cannot be empty!' : ''}
          label='Overview'
          variant='outlined'
          onChange={handleOverviewChange}
          value={overview}
          multiline={true}
          required={true}
        />

        <TextField
          error={String(popularity).length <= 0 ? true : false}
          helperText={
            String(popularity).length <= 0 ? 'Popularity cannot be empty!' : ''
          }
          type='number'
          inputProps={{ step: '0.01' }}
          label='Popularity'
          variant='outlined'
          onChange={handlePopularityChange}
          value={popularity}
          required={true}
        />

        <TextField
          error={poster_path.length <= 0 ? true : false}
          helperText={
            poster_path.length <= 0 ? 'Poster URL cannot be empty!' : ''
          }
          label='Poster URL'
          variant='outlined'
          onChange={handlePosterPathChange}
          value={poster_path}
          required={true}
          multiline={true}
        />

        <TextField
          error={tags.length <= 0 ? true : false}
          helperText={
            tags.length <= 0
              ? 'Tags cannot be empty!'
              : 'Separated by coma and space.'
          }
          label='Tags'
          variant='outlined'
          onChange={handleTagsChange}
          value={tags}
          required={true}
          multiline={true}
        />
        <Button type='submit' variant='contained' color='primary'>
          Update TV Series
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
    </Card>
  );
};
