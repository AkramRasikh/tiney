import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { arrayOf, func, number, shape, string } from 'prop-types';
import { SelectOptions } from '../../components';

const useStyles = makeStyles(() => ({
  actionsClass: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const DashboardActions = ({ dashboardActions }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.actionsClass}>
      {dashboardActions.map(({ setValue, value, menuItems, label }) => (
        <Grid key={label}>
          <SelectOptions
            setValue={setValue}
            value={value}
            menuItems={menuItems}
            label={label}
          />
        </Grid>
      ))}
    </Grid>
  );
};

DashboardActions.propTypes = {
  dashboardActions: arrayOf(
    shape({
      setValue: func.isRequired,
      value: number.isRequired,
      menuItems: arrayOf(
        shape({
          value: number,
          text: string,
        }),
      ).isRequired,
      label: string.isRequired,
    }),
  ).isRequired,
};

export default DashboardActions;
