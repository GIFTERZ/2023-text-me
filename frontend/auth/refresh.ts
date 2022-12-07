import axios, { AxiosRequestConfig } from 'axios';
import { getCookie, setCookie } from '../components/common/Cookie';

const refresh = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const refreshToken = localStorage.getItem('refreshTokenId');
  let accessToken = getCookie('accessToken');

  if (36000000 - new Date().getTime() < 0 && refreshToken) {
    await axios
      .get('/users/token/refresh', {
        params: {
          emails: localStorage.getItem('email'),
          request: {
            refreshToken: refreshToken,
          },
        },
      })
      .then(res => {
        accessToken = res.data.accessToken;
        setCookie('accessToken', accessToken);
        localStorage.setItem('refreshTokenId', res.data.refreshToken);
      });
  }

  config.headers['Authorization'] = `Bearer ${accessToken}`;
  return config;
};

const refreshError = () => {
  localStorage.removeItem('refreshTokenId');
};

export { refresh, refreshError };
