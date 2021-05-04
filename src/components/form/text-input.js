import { makeStyles, TextField } from '@material-ui/core';
import { object, string } from 'prop-types';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

const TextInput = ({ type, label, name, register }) => {
  const classes = useStyles();
  return (
    <TextField
      id={name}
      type={type}
      label={label}
      className={classes.root}
      data-testid={name}
      InputLabelProps={{
        shrink: true,
      }}
      {...register}
    />
  );
};

TextInput.propTypes = {
  type: string.isRequired,
  label: string.isRequired,
  name: string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  register: object.isRequired,
  helperText: string,
};

TextInput.defaultProps = {
  helperText: '',
};

export default TextInput;
