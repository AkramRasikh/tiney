export default (wordA, wordB) => {
  if (wordA < wordB) {
    return -1;
  }
  if (wordA > wordB) {
    return 1;
  }
  return 0;
};
