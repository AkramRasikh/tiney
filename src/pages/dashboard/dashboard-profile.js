import React from 'react';
import { string } from 'prop-types';
import { Grid, Avatar, makeStyles } from '@material-ui/core';
import DashboardDetails from './dashboard-profile-details';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 10%',
  },
  avatarClass: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    margin: '0 auto',
  },
}));

const DashboardProfile = ({ avatarURL, ...rest }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.root} data-testid='dashboard-id'>
      <Avatar alt='avatarImg' src={avatarURL} className={classes.avatarClass} />
      <Grid>
        <DashboardDetails {...rest} />
      </Grid>
    </Grid>
  );
};

DashboardProfile.propTypes = {
  avatarURL: string,
};

DashboardProfile.defaultProps = {
  avatarURL: '',
};

export default DashboardProfile;
