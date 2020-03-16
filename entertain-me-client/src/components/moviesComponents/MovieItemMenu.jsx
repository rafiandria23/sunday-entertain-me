import React from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  MenuItem,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList
} from '@material-ui/core';

export default props => {
  const { open, movieId, anchorRef, handleListKeyDown, handleClose } = props;

  return (
    // <Menu
    //   id='movie-item-menu'
    //   anchorEl={anchorEl}
    //   keepMounted
    //   open={Boolean(anchorEl)}
    // >
    //   <MenuItem

    //   >
    //     View Details
    //   </MenuItem>
    //   {/* {decideFavorite()} */}
    // </Menu>
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom' ? 'center top' : 'center bottom'
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id='menu-list-grow'
                onKeyDown={handleListKeyDown}
              >
                <MenuItem
                  data-testid='view-detail-button'
                  component={Link}
                  to={`/movies/${movieId}`}
                  onClose={handleClose}
                >
                  See Details
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};
