import axios from '../api/axios';

export const setAuthHeader = (accessToken) => {
  axios.defaults.headers.common['Authorization'] = accessToken;
};
