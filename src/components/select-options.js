import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid } from '@material-ui/core';
import { arrayOf, func, number, shape, string } from 'prop-types';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const SelectOptions = ({ setValue, value, menuItems, label }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Grid data-testid='select-id'>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-controlled-open-select-label'>{label}</InputLabel>
        <Select
          labelId='demo-controlled-open-select-label'
          id='demo-controlled-open-select'
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          onChange={handleChange}
        >
          <MenuItem value={0}>
            <em>default</em>
          </MenuItem>
          {menuItems.map((sortRef) => (
            <MenuItem key={sortRef.value} value={sortRef.value}>
              {sortRef.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

SelectOptions.propTypes = {
  setValue: func.isRequired,
  value: number.isRequired,
  menuItems: arrayOf(
    shape({
      value: number,
      text: string,
    }),
  ).isRequired,
  label: string.isRequired,
};

export default SelectOptions;
