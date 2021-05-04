import React, { Fragment } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { Box, List, makeStyles } from '@material-ui/core';
import { ListItemComponent } from '../../components';

const useStyles = makeStyles(() => ({
  root: {
    paddingBottom: '10px',
    paddingLeft: '10px',
  },
  nestedList: {
    display: 'contents',
  },
}));

const DashboardEnrollmentContainer = ({ enrollments }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <List>
        {enrollments.map(({ name, startDate, guardians }) => (
          <Fragment key={startDate}>
            <ListItemComponent
              primaryText={
                name ? `${name} (Child)` : "Issue getting student's name 😬!"
              }
              secondaryText={`Start date: ${startDate}`}
            >
              {guardians && (
                <List className={classes.nestedList}>
                  {guardians.map(({ name: guardianName, email, avatarURL }) => (
                    <ListItemComponent
                      key={guardianName}
                      primaryText={`${guardianName} (Guardian)`}
                      secondaryText={email}
                      src={avatarURL}
                      showSubDirectIcon
                      disableGutters
                    />
                  ))}
                </List>
              )}
            </ListItemComponent>
          </Fragment>
        ))}
      </List>
    </Box>
  );
};

DashboardEnrollmentContainer.propTypes = {
  enrollments: arrayOf(
    shape({
      slug: string,
      name: string,
      startDate: string,
      guardians: arrayOf(
        shape({
          slug: string,
          avatarURL: string,
          name: string,
          email: string,
        }),
      ),
    }),
  ).isRequired,
};

export default DashboardEnrollmentContainer;
