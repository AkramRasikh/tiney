import { Button } from '@material-ui/core';
import { bool, string } from 'prop-types';
import React from 'react';

const FormButton = ({ disabled, children }) => (
  <Button type='submit' disabled={disabled} data-testid='submitForm'>
    {children}
  </Button>
);

FormButton.propTypes = {
  disabled: bool.isRequired,
  children: string.isRequired,
};

export default FormButton;
