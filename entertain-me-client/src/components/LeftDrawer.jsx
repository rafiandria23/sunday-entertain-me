import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Home as HomeIcon,
  Movie as MovieIcon,
  LiveTv as LiveTvIcon
} from '@material-ui/icons';

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
});

export default function LeftDrawer(props) {
  const classes = useStyles();
  const { handleDrawer, leftDrawerStatus } = props;

  const fullList = () => {
    return (
      <div
        className={classes.fullList}
        role='presentation'
        onClick={handleDrawer}
        onKeyDown={handleDrawer}
      >
        <List>
          <ListItem button key='Home' component={NavLink} to='/'>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>

          <ListItem
            button
            key='Movies'
            component={NavLink}
            to='/movies'
            activeClassName='Mui-selected'
          >
            <ListItemIcon>
              <MovieIcon />
            </ListItemIcon>
            <ListItemText primary='Movies' />
          </ListItem>

          <ListItem
            button
            key='TV Series'
            component={NavLink}
            to='/tv'
            activeClassName='Mui-selected'
          >
            <ListItemIcon>
              <LiveTvIcon />
            </ListItemIcon>
            <ListItemText primary='TV Series' />
          </ListItem>
        </List>
      </div>
    );
  };

  return (
    <Drawer open={leftDrawerStatus} onClose={handleDrawer}>
      {fullList()}
    </Drawer>
  );
}
