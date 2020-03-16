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
  PhotoLibrary as PhotoLibraryIcon,
  Stars as StarsIcon
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
            key='Photos'
            component={NavLink}
            to='/photos'
            activeClassName='Mui-selected'
          >
            <ListItemIcon>
              <PhotoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary='Photos' />
          </ListItem>

          <ListItem
            button
            key='My Favorites'
            component={NavLink}
            to='/photos/favorites'
            activeClassName='Mui-selected'
          >
            <ListItemIcon>
              <StarsIcon />
            </ListItemIcon>
            <ListItemText primary='My Favorites' />
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
