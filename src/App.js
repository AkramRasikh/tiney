import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { addNewProvider, getChildren, getProviders } from './services';
import Dashboard from './pages/dashboard';
import dateToYears from './utils/date-to-years';
import { SnackbarComponent, GenericError, LoadingSpinner } from './components';
import formatDate from './utils/format-date';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  // note scale these two in to one
  const [minderHasJoined, setMinderHasJoined] = useState(false);
  const [minderFailedToJoin, setMinderFailedToJoin] = useState(false);
  const [errorOccured, setErrorOccured] = useState('');
  const [mindersAndChildrenData, setMindersAndChildrenData] = useState([]);
  const today = new Date();

  const formatMindersAndChildren = (providers, children) =>
    providers.map((provider) => {
      if (provider.enrollments) {
        const providerEnrollments = provider.enrollments.map((enrollment) => {
          const enrollmentInfo = children.find(
            (child) => child.slug === enrollment.childSlug,
          );
          return {
            ...enrollmentInfo,
            startDate: formatDate(enrollment.startDate),
          };
        });

        return {
          ...provider,
          age: dateToYears(today, provider.dob),
          enrollments: providerEnrollments,
          registrationDate:
            provider.registrationDate && formatDate(provider.registrationDate),
        };
      }

      return {
        ...provider,
        age: dateToYears(today, provider.dob),
        registrationDate:
          provider.registrationDate && formatDate(provider.registrationDate),
      };
    });

  useEffect(() => {
    const getData = async () => {
      try {
        const [providers, children] = await Promise.all([
          getProviders(),
          getChildren(),
        ]);
        const formattedMindersAndChildren = formatMindersAndChildren(
          providers,
          children,
        );
        setMindersAndChildrenData(formattedMindersAndChildren);
      } catch (error) {
        setErrorOccured(
          'Ooo! Looks like something went wrong 🤕! Try refresh or try again a little later',
        );
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const addChildminderData = async (minderInfo) => {
    setIsLoading(true);
    try {
      await addNewProvider(minderInfo);
      setMinderHasJoined(true);
      setMindersAndChildrenData((prev) => [
        ...prev,
        { ...minderInfo, age: dateToYears(today, minderInfo.dob) },
      ]);
    } catch (error) {
      setMinderFailedToJoin(true);
    } finally {
      setIsLoading(false);
    }
  };

  const showDashboardPage =
    !isLoading && !errorOccured && !!mindersAndChildrenData.length;
  const showErrorPage = !isLoading && errorOccured;

  return (
    <Grid>
      {isLoading && <LoadingSpinner />}
      {showDashboardPage && (
        <Dashboard
          mindersAndChildrenData={mindersAndChildrenData}
          addChildminderData={addChildminderData}
        />
      )}
      {showErrorPage && <GenericError message={errorOccured} />}
      <SnackbarComponent
        open={minderHasJoined}
        setOpen={setMinderHasJoined}
        message='Hooray! new Joiner!'
      />
      <SnackbarComponent
        open={minderFailedToJoin}
        setOpen={setMinderFailedToJoin}
        message='Oops! Problem occurred adding user'
        severity='error'
      />
    </Grid>
  );
};

export default App;
