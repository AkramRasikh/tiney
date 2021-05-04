import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { string } from 'prop-types';

const GenericError = ({ message }) => (
  <Box p={5} textAlign='center'>
    <Typography component='h1'>{message}</Typography>
  </Box>
);

GenericError.propTypes = {
  message: string.isRequired,
};

export default GenericError;
