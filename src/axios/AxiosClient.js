import Axios from 'axios';

const AxiosClient = Axios.create({
  baseURL: 'https://v2.convertapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 10000,
});

AxiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response.data;
  },
  error => {
    console.log('err: ' + error);
    return Promise.reject(error);
  },
);

export default AxiosClient;
