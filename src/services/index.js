import axios from 'axios';

export const getProviders = async () => {
  const { data } = await axios.get(process.env.REACT_APP_PROVIDERS_API);
  return data;
};

export const addNewProvider = async (providerInfo) =>
  // eslint-disable-next-line no-return-await
  await axios.post(process.env.REACT_APP_PROVIDERS_API, providerInfo);

export const getChildren = async () => {
  const { data } = await axios.get(process.env.REACT_APP_CHILDREN_API);
  return data;
};
