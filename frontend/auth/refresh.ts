import axios, { AxiosRequestConfig } from 'axios';
import { getCookie, setCookie } from '../components/common/Cookie';
const ACCESS_EXPIRY_TIME = 36000000;

const checkExpire = (refreshToken: string) => {
  if (ACCESS_EXPIRY_TIME - new Date().getTime() < 0 && refreshToken) {
    return true;
  }

  return false;
};

const refresh = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const refreshToken = localStorage.getItem('textMeRefreshTokenId');
  let accessToken = getCookie('textMeAccessToken');

  if (checkExpire(refreshToken)) {
    const body = {
      refreshToken: refreshToken,
    };

    await axios
      .get('/users/token/refresh', {
        params: { ...body },
      })
      .then(res => {
        accessToken = res.data.accessToken;
        setCookie('textMeAccessToken', accessToken);
        localStorage.setItem('textMeRefreshTokenId', res.data.refreshToken);
      });
  }

  config.headers['Authorization'] = `Bearer ${accessToken}`;
  return config;
};

const refreshError = () => {
  localStorage.removeItem('textMeRefreshTokenId');
};

export { refresh, refreshError };
