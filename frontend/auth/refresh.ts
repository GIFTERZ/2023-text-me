import axios, { AxiosRequestConfig } from "axios";
import { deleteCookie, getCookie, setCookie } from "./Cookie";

const ACCESS_EXPIRY_TIME = 36000000;
const TEXT_ME_REFRESH_TOKEN_ID = "textMeRefreshTokenId";
const TEXT_ME_ACCESS_TOKEN = "textMeAccessToken";
const TEXT_ME_ACCESS_EXPIRY_TIME = "textMeAccessExpiryTime";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
axios.defaults.withCredentials = true;

const checkExpire = (expireTime: number, refreshToken: string) => {
  if (expireTime - new Date().getTime() < 30000 && refreshToken) {
    return true;
  }

  return false;
};

const refresh = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const refreshToken = localStorage.getItem(TEXT_ME_REFRESH_TOKEN_ID);
  let accessToken = getCookie(TEXT_ME_ACCESS_TOKEN);
  let expiryTime = Number(localStorage.getItem(TEXT_ME_ACCESS_EXPIRY_TIME));

  if (checkExpire(expiryTime, refreshToken)) {
    await axios
      .post(
        "/users/token/refresh",
        {
          accessToken,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        let createdTime = new Date().getTime();
        accessToken = res.data.accessToken;
        setCookie(TEXT_ME_ACCESS_TOKEN, accessToken);
        localStorage.setItem(TEXT_ME_REFRESH_TOKEN_ID, res.data.refreshToken);
        localStorage.setItem(
          TEXT_ME_ACCESS_EXPIRY_TIME,
          (createdTime + ACCESS_EXPIRY_TIME).toString()
        );
      });
  }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

const refreshError = () => {
  localStorage.removeItem(TEXT_ME_REFRESH_TOKEN_ID);
  deleteCookie(TEXT_ME_ACCESS_TOKEN);
  alert("로그인이 만료되었습니다.");
  window.location.href = "/";
};

export { refresh, refreshError };
