import axios, { AxiosRequestConfig } from 'axios';
import { getCookie, setCookie } from '../components/common/Cookie';
const ACCESS_EXPIRY_TIME = 36000000;
import api from '../auth/api';
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

const checkExpire = () => {
  console.log(ACCESS_EXPIRY_TIME - new Date().getTime());
  if (ACCESS_EXPIRY_TIME - new Date().getTime() < 0) {
    return true;
  }

  return false;
};

const refresh = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const refreshToken = localStorage.getItem('textMeRefreshTokenId');
  let accessToken = getCookie('textMeAccessToken');

  // if (checkExpire()) {
  //   console.log(ACCESS_EXPIRY_TIME - new Date().getTime());
  //   await axios
  //     .post(
  //       '/users/token/refresh',
  //       {
  //         refreshToken: accessToken,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       },
  //     )
  //     .then(res => {
  //       accessToken = res.data.accessToken;
  //       setCookie('textMeAccessToken', accessToken);
  //       localStorage.setItem('textMeRefreshTokenId', res.data.refreshToken);
  //     });
  // }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

const refreshError = () => {
  localStorage.removeItem('textMeRefreshTokenId');
};

export { refresh, refreshError };
