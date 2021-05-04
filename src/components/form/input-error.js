import React from 'react';
import { string } from 'prop-types';
import { FormHelperText } from '@material-ui/core';

const InputError = ({ errorMessage }) => (
  <FormHelperText>{errorMessage}</FormHelperText>
);

InputError.propTypes = {
  errorMessage: string.isRequired,
};

export default InputError;
