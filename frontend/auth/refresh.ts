import axios, { AxiosRequestConfig } from "axios";
import { PATH } from "../constants/api";
import { ACCESS_EXPIRY_TIME } from "../constants/token";
import {
  deleteAccessToken,
  getAccessToken,
  getExpiryTime,
  setAccessToken,
  setExpiryTime,
} from "./utils";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
axios.defaults.withCredentials = true;

const checkExpire = (expireTime: number) => {
  if (expireTime - new Date().getTime() < 30000) {
    return true;
  }

  return false;
};

const refresh = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  let accessToken = getAccessToken();
  let expiryTime = Number(getExpiryTime());

  if (checkExpire(expiryTime)) {
    await axios
      .post(
        PATH.USER.REFRESH,
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
        setAccessToken(accessToken);
        setExpiryTime(createdTime + ACCESS_EXPIRY_TIME);
      });
  }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

const refreshError = () => {
  deleteAccessToken();
  alert("로그인이 만료되었습니다.");
  window.location.href = "/";
};

export { refresh, refreshError };
