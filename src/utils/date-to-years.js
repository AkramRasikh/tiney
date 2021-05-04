export default (dateAnchor, targetDate) => {
  const targetDateFormatted = new Date(targetDate);
  return dateAnchor.getFullYear() - targetDateFormatted.getFullYear();
};
