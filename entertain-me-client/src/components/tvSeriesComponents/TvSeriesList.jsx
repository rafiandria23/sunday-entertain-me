import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Fab, Paper, CircularProgress } from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import {
  AddTvSeriesForm,
  TvSeriesItem,
  TitleComponent
} from '../../components';
import { FETCH_ALL_TV_SERIES } from '../../schemas/tvSeriesSchemas';

const useStyles = makeStyles(theme => ({
  tvSeriesList: {
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
  addTvSeriesForm: {
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
  const [addTvSeriesForm, setAddTvSeriesForm] = useState(false);
  const { loading, error, data, refetch } = useQuery(FETCH_ALL_TV_SERIES);

  const handleAddTvSeriesForm = () => {
    setAddTvSeriesForm(!addTvSeriesForm);
  };

  if (loading) {
    return (
      <div className={classes.tvSeriesList}>
        <CircularProgress />
      </div>
    );
  }

  const handleRender = () => {
    const { searchQuery } = props;
    if (searchQuery.length > 0) {
      const filteredTvSeries = data.tvSeries.filter(tvSeriesItem => {
        return tvSeriesItem.tags
          .join(', ')
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
      return filteredTvSeries.map(tvSeriesItem => {
        return (
          <TvSeriesItem key={tvSeriesItem._id} tvSeriesData={tvSeriesItem} />
        );
      });
    } else {
      return data.tvSeries.map(tvSeriesItem => {
        return (
          <TvSeriesItem key={tvSeriesItem._id} tvSeriesData={tvSeriesItem} />
        );
      });
    }
  };

  const closeAddTvSeriesForm = () => {
    setAddTvSeriesForm(false);
  };

  return (
    <>
      <TitleComponent title='TV Series List' />
      <div className={classes.tvSeriesList} onMouseDown={closeAddTvSeriesForm}>
        {handleRender()}
      </div>
      {!addTvSeriesForm && (
        <Fab
          className={classes.customFab}
          onClick={handleAddTvSeriesForm}
          color='primary'
        >
          <AddIcon />
        </Fab>
      )}
      {addTvSeriesForm && (
        <Fab
          className={classes.customFab}
          onClick={handleAddTvSeriesForm}
          color='primary'
        >
          <RemoveIcon onClick={handleAddTvSeriesForm} />
        </Fab>
      )}
      {addTvSeriesForm && (
        <Paper elevation={5} className={classes.addTvSeriesForm}>
          <AddTvSeriesForm
            refetchTvSeries={refetch}
            handleAddTvSeriesForm={handleAddTvSeriesForm}
          />
        </Paper>
      )}
    </>
  );
};
