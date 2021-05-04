import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Snackbar } from '@material-ui/core';
import { bool, func, string } from 'prop-types';

const Alert = (props) => <MuiAlert elevation={6} variant='filled' {...props} />;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const SnackbarComponent = ({ open, setOpen, message, severity }) => {
  const classes = useStyles();
  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

SnackbarComponent.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
  message: string.isRequired,
  severity: string,
};

SnackbarComponent.defaultProps = {
  severity: 'success',
};

export default SnackbarComponent;
