import React from 'react';
import { List, makeStyles } from '@material-ui/core';
import { arrayOf, func, number, shape, string } from 'prop-types';
import { ListItemComponent, ListViewActionButton } from '../../components';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const DashboardMindersList = ({
  sortedDashboardList,
  setSelectedMinderFunc,
  setSelectedMindersEnrollmentFunc,
}) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {sortedDashboardList.map((minder) => {
        const enrollmentText =
          !!minder.enrollments && minder.enrollments.length
            ? `Enrollments: ${minder.enrollments.length}`
            : 'No enrollments';

        const disabled = !!minder.enrollments && !!minder.enrollments.length;
        return (
          <ListItemComponent
            key={minder.slug}
            primaryText={minder.name}
            secondaryText={enrollmentText}
            src={minder.avatarURL}
            showDivider
          >
            <ListViewActionButton
              onClick={() =>
                setSelectedMindersEnrollmentFunc(minder.enrollments)
              }
              disabled={!disabled}
              icon='child'
            />
            <ListViewActionButton
              onClick={() => setSelectedMinderFunc(minder)}
              icon='profile'
            />
          </ListItemComponent>
        );
      })}
    </List>
  );
};

DashboardMindersList.propTypes = {
  sortedDashboardList: arrayOf(
    shape({
      address: string,
      avatarURL: string,
      city: string,
      age: number,
      email: string,
      name: string,
      postcode: string,
      registrationDate: string,
      slug: string,
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
      ),
    }),
  ).isRequired,
  setSelectedMinderFunc: func.isRequired,
  setSelectedMindersEnrollmentFunc: func.isRequired,
};

export default DashboardMindersList;
