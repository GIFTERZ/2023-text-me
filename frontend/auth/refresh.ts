import axios, { AxiosRequestConfig } from 'axios';
import { getCookie, setCookie } from '../components/common/Cookie';
const ACCESS_EXPIRY_TIME = 36000000;
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

const checkExpire = (expireTime: number, refreshToken: string) => {
  if (expireTime - new Date().getTime() < 30000 && refreshToken) {
    return true;
  }

  return false;
};

const refresh = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const refreshToken = localStorage.getItem('textMeRefreshTokenId');
  let accessToken = getCookie('textMeAccessToken');
  let expiryTime = Number(localStorage.getItem('accessExpireyTime'));

  if (checkExpire(expiryTime, refreshToken)) {
    await axios
      .post(
        '/users/token/refresh',
        {
          refreshToken: accessToken,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(res => {
        let createdTime = new Date().getTime();
        accessToken = res.data.accessToken;
        setCookie('textMeAccessToken', accessToken);
        localStorage.setItem('textMeRefreshTokenId', res.data.refreshToken);
        localStorage.setItem('accessExpireyTime', (createdTime + ACCESS_EXPIRY_TIME).toString());
      });
  }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

const refreshError = () => {
  localStorage.removeItem('textMeRefreshTokenId');
};

export { refresh, refreshError };
