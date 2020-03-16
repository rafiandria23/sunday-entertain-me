import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router-dom';
import {
  Container,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Button
} from '@material-ui/core';
import { ArrowBackIos as ArrowBackIosIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { UpdateTvSeriesForm } from '..';
import {
  FIND_ONE_TV_SERIES,
  FETCH_ALL_TV_SERIES
} from '../../schemas/tvSeriesSchemas';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default props => {
  const classes = useStyles();
  const { tvSeriesId } = useParams();
  const history = useHistory();
  const [val, setVal] = useState(0);
  const { refetch } = useQuery(FETCH_ALL_TV_SERIES);
  const { loading, error, data } = useQuery(FIND_ONE_TV_SERIES, {
    variables: { _id: tvSeriesId }
  });

  if (loading) {
    return <CircularProgress />;
  }

  const handleTabChange = (e, newVal) => {
    setVal(newVal);
  };

  const clickGoBack = () => {
    history.goBack();
  };

  const renderTvSeriesDetails = () => {
    if (data.findOneTvSeries) {
      const selectedTvSeries = data.findOneTvSeries;
      return (
        <Card className={classes.root}>
          <CardContent>
            <Typography variant='h5' component='h2'>
              {selectedTvSeries.title}
            </Typography>
            <Typography className={classes.pos} color='textSecondary'>
              {selectedTvSeries.overview}
            </Typography>
            <Typography className={classes.pos} color='textSecondary'>
              {selectedTvSeries.popularity}
            </Typography>
            <Typography className={classes.pos} color='textSecondary'>
              {selectedTvSeries.tags.join(', ')}
            </Typography>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              startIcon={<ArrowBackIosIcon />}
              onClick={clickGoBack}
            >
              Back
            </Button>
          </CardContent>
        </Card>
      );
    }
  };

  const renderUpdateForm = () => {
    if (data.findOneTvSeries) {
      const selectedTvSeries = data.findOneTvSeries;
      return (
        <UpdateTvSeriesForm
          tvSeriesData={selectedTvSeries}
          refetchTvSeries={refetch}
        />
      );
    }
  };

  return (
    <Container>
      <div className={classes.root}>
        <AppBar position='static'>
          <Tabs
            value={val}
            onChange={handleTabChange}
            aria-label='TV Series Option Tabs'
          >
            <Tab label='TV Series Details' {...a11yProps(0)} />
            <Tab label='Update / Delete TV Series' {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <TabPanel value={val} index={0}>
          {renderTvSeriesDetails()}
        </TabPanel>
        <TabPanel value={val} index={1}>
          {renderUpdateForm()}
        </TabPanel>
      </div>
    </Container>
  );
};
