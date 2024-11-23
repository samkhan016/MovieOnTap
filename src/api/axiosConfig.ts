import axios from 'axios';
import {BASE_URL_FROM_ENV} from '@env';
import Toast from 'react-native-toast-message';

const axiosInstance = axios.create({
  baseURL: BASE_URL_FROM_ENV,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const handleErrorResponse = async (error: any) => {
  const {response} = error;

  if (response) {
    Toast.show({
      type: 'error',
      text1: 'Failed',
      text2: response.data?.desc || 'Something went wrong',
    });

    console.error('Response Error:', response.data?.desc);
  }
};

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (axios.isAxiosError(error)) {
      await handleErrorResponse(error);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
