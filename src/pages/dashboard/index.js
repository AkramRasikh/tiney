import React, { useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { arrayOf, func, number, shape, string } from 'prop-types';
import randomstring from 'randomstring';
import AddIcon from '@material-ui/icons/Add';
import {
  Form,
  FloatingActionButtonZoom,
  FullScreenDialog,
} from '../../components';
import DashboardProfile from './dashboard-profile';
import DashboardEnrollmentContainer from './dashboard-enrollment-container';
import addChildminderFields from '../../form-fields/add-childminder';
import useFilterDashboard from '../../hooks/useFilterDashboard';
import useSortDashboard from '../../hooks/useSortDashboard';
import DashboardActions from './dashboard-actions';
import capitaliseFirstLetter from '../../utils/capitalise-first-letter';
import DashboardMindersList from './dashboard-minders-list';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '900px',
    margin: 'auto',
  },
}));

const Dashboard = ({ mindersAndChildrenData, addChildminderData }) => {
  const classes = useStyles();
  const [selectedMinder, setSelectedMinder] = useState({});
  const [selectedMindersEnrollment, setSelectedMindersEnrollment] = useState(
    [],
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogKey, setDialogKey] = useState();

  const submitChildMinderData = ({ firstName, lastName, dob, email }) => {
    const idString = `prv_${randomstring.generate(16)}`;
    // two seperate ids for JSONserver
    setOpenDialog(false);
    addChildminderData({
      id: idString,
      slug: idString,
      name: `${capitaliseFirstLetter(firstName)} ${capitaliseFirstLetter(
        lastName,
      )}`,
      dob: new Date(dob),
      email,
    });
  };

  const { dashboardActionsFilter, filteredArr } = useFilterDashboard(
    mindersAndChildrenData,
  );
  const { sortedDashboardList, dashboardActionsSort } = useSortDashboard(
    filteredArr,
  );

  const setSelectedMinderFunc = (data) => {
    setSelectedMinder(data);
    setDialogKey('dashboard');
    setOpenDialog(true);
  };

  const setSelectedMindersEnrollmentFunc = (enrollments) => {
    setSelectedMindersEnrollment(enrollments);
    setDialogKey('enrollment');
    setOpenDialog(true);
  };

  const openForm = () => {
    setDialogKey('form');
    setOpenDialog(true);
  };

  const dashboardActionsArr = [dashboardActionsFilter, dashboardActionsSort];

  const dashboardModals = {
    dashboard: <DashboardProfile {...selectedMinder} />,
    enrollment: (
      <DashboardEnrollmentContainer enrollments={selectedMindersEnrollment} />
    ),
    form: (
      <Form fields={addChildminderFields} submitData={submitChildMinderData} />
    ),
  };

  return (
    <Grid className={classes.root} data-testid='dashboard-layout'>
      <Typography align='center' component='h1'>
        Welcome to your dashboard!
      </Typography>
      <DashboardActions dashboardActions={dashboardActionsArr} />
      <DashboardMindersList
        sortedDashboardList={sortedDashboardList}
        setSelectedMinderFunc={setSelectedMinderFunc}
        setSelectedMindersEnrollmentFunc={setSelectedMindersEnrollmentFunc}
      />
      {openDialog && (
        <FullScreenDialog open={openDialog} setOpen={setOpenDialog}>
          {dashboardModals[dialogKey]}
        </FullScreenDialog>
      )}
      {!openDialog && (
        <FloatingActionButtonZoom onClick={openForm}>
          <AddIcon />
        </FloatingActionButtonZoom>
      )}
    </Grid>
  );
};

Dashboard.propTypes = {
  mindersAndChildrenData: arrayOf(
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
  addChildminderData: func.isRequired,
};

export default Dashboard;
