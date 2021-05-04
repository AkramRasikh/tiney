import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    position: 'absolute',
    top: '50%',
    left: '50%',
    '& > * + *': {
      marginLeft: '8px',
    },
  },
}));

const LoadingSpinner = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <CircularProgress color='secondary' />
    </Grid>
  );
};

export default LoadingSpinner;
