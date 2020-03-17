import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CardActionArea,
  CardContent,
  IconButton,
  Typography
} from '@material-ui/core';
import {
  // Favorite as FavoriteIcon,
  MoreVert as MoreVertIcon,
  LocalOffer as LocalOfferIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import MovieItemMenu from './MovieItemMenu';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '3vh',
    maxWidth: 345
  },
  media: {
    height: 600
    // paddingTop: '56.25%' // 16:9
  },
  trafficDetail: {
    margin: 'auto 0.3vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));

export default props => {
  const classes = useStyles();
  const { movieData } = props;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup='true'
            onClick={handleToggle}
          >
            <MoreVertIcon />
          </IconButton>
        }
      />
      <MovieItemMenu
        movieId={movieData._id}
        open={open}
        anchorRef={anchorRef}
        handleListKeyDown={handleListKeyDown}
        handleClose={handleClose}
      />
      <CardMedia className={classes.media} image={movieData.poster_path} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          {movieData.title}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {movieData.overview}
        </Typography>
      </CardContent>
      <CardActionArea>
        <CardActions disableSpacing>
          <div className={classes.trafficDetail}>
            <IconButton aria-label='Tags'>
              <LocalOfferIcon />
            </IconButton>
            <Typography variant='body2' color='textSecondary' component='p'>
              {movieData.tags
                .map(tag => `${tag[0].toUpperCase()}${tag.slice(1)}`)
                .join(', ')}
            </Typography>
          </div>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
