import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { number, string } from 'prop-types';

const DashboardProfileDetails = ({
  name,
  email,
  postcode,
  address,
  city,
  age,
  registrationDate,
}) => (
  <Box mt={5}>
    {name && (
      <Grid container justify='space-between'>
        <Typography>Name:</Typography>
        <Typography>{name}</Typography>
      </Grid>
    )}
    {email && (
      <Grid container justify='space-between'>
        <Typography>Email:</Typography>
        <Typography>{email}</Typography>
      </Grid>
    )}
    {address && (
      <Grid container justify='space-between'>
        <Typography>Address:</Typography>
        <Typography>{address}</Typography>
      </Grid>
    )}
    {postcode && (
      <Grid container justify='space-between'>
        <Typography>Postcode:</Typography>
        <Typography>{postcode}</Typography>
      </Grid>
    )}
    {city && (
      <Grid container justify='space-between'>
        <Typography>City:</Typography>
        <Typography>{city}</Typography>
      </Grid>
    )}
    {age && (
      <Grid container justify='space-between'>
        <Typography>Age:</Typography>
        <Typography>{age} years old</Typography>
      </Grid>
    )}
    {registrationDate && (
      <Grid container justify='space-between'>
        <Typography>Registration date:</Typography>
        <Typography>{registrationDate}</Typography>
      </Grid>
    )}
  </Box>
);

DashboardProfileDetails.propTypes = {
  name: string.isRequired,
  email: string.isRequired,
  address: string,
  postcode: string,
  city: string,
  age: number.isRequired,
  registrationDate: string,
};

DashboardProfileDetails.defaultProps = {
  address: '',
  postcode: '',
  city: '',
  registrationDate: '',
};

export default DashboardProfileDetails;
