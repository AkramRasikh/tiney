import { useState } from 'react';
import sortByAlphabet from '../utils/sort-by-alphabet';

const sortKey = [
  { value: 10, text: 'A to Z' },
  { value: 20, text: 'Z to A' },
];

const useSortDashboard = (dashboardList) => {
  const [isSorted, setIsSorted] = useState(0);

  const getSortedArr = () => {
    if (isSorted === 10) {
      return [...dashboardList].sort((a, b) => sortByAlphabet(a.name, b.name));
    }
    if (isSorted === 20) {
      return [...dashboardList].sort((a, b) => sortByAlphabet(b.name, a.name));
    }
    return dashboardList;
  };

  return {
    sortedDashboardList: getSortedArr(),
    dashboardActionsSort: {
      value: isSorted,
      setValue: setIsSorted,
      menuItems: sortKey,
      label: 'Name',
    },
  };
};

export default useSortDashboard;
