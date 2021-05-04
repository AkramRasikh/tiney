const dateToday = new Date();

export const isAbove18TextWarning = '18 is the min age to sign up';

export const isAbove18 = (date) => {
  const yearDiff = dateToday.getFullYear() - new Date(date).getFullYear();
  if (yearDiff < 18) {
    return isAbove18TextWarning;
  }
  return true;
};
