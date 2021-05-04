import { useState } from 'react';

const filterKey = [
  { value: 10, text: 'With enrollments' },
  { value: 20, text: 'Without enrollments' },
];

const useFilterDashboard = (dashboardList) => {
  const [isFiltered, setIsFiltered] = useState(0);

  const getFilteredArr = () => {
    if (isFiltered === 10) {
      return [...dashboardList].filter(
        (minder) => !!minder.enrollments && !!minder.enrollments.length,
      );
    }
    if (isFiltered === 20) {
      return [...dashboardList].filter(
        (minder) => !!minder.enrollments && !minder.enrollments.length,
      );
    }
    return dashboardList;
  };

  return {
    filteredArr: getFilteredArr(),
    dashboardActionsFilter: {
      menuItems: filterKey,
      value: isFiltered,
      setValue: setIsFiltered,
      label: 'Enrollment',
    },
  };
};

export default useFilterDashboard;
