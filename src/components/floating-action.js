import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Zoom, Fab } from '@material-ui/core';
import { func, node } from 'prop-types';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 10000,
  },
}));

const FloatingAction = ({ children, onClick }) => {
  const classes = useStyles();

  // can refactor for scale
  const transitionDuration = {
    enter: 225,
    exit: 195,
  };

  return (
    <Grid className={classes.root}>
      <Zoom in timeout={transitionDuration} unmountOnExit>
        <Fab className={classes.fab} onClick={onClick} data-testid='fab-id'>
          {children}
        </Fab>
      </Zoom>
    </Grid>
  );
};

FloatingAction.propTypes = {
  children: node.isRequired,
  onClick: func.isRequired,
};

export default FloatingAction;
