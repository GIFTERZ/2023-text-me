import { AxiosRequestConfig } from "axios";
import { PATH } from "../constants/api";
import { getRefreshToken, setRefreshToken } from "./utils";
import visitorApi from "./visitorApi";

const ACCESS_TOKEN_TIME = 1800_000;

const refreshTokenRotation = () => {
  let accessToken: string = null;
  let expirationTime: number = null;

  const setAccessToken = (token: string, createdAt: string) => {
    accessToken = token;
    expirationTime = new Date(createdAt).getTime() + ACCESS_TOKEN_TIME;
  };

  const isExpired = () => {
    const now = new Date().getTime();
    return expirationTime < now;
  };

  const getNewTokens = async function () {
    const refreshToken = getRefreshToken();
    await visitorApi
      .post(PATH.USER.REFRESH, {
        refreshToken,
      })
      .then((res) => {
        const {
          data: { accessToken, createdAt, refreshToken },
        } = res;
        setAccessToken(accessToken, createdAt);
        setRefreshToken(refreshToken);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    setAuthHeader: async function (
      config: AxiosRequestConfig
    ): Promise<AxiosRequestConfig> {
      if (!accessToken || isExpired()) {
        await getNewTokens();
      }

      config.headers.Authorization = `Bearer ${accessToken}`;

      return config;
    },
    setAccessToken: (at: string, createdAt: string) => {
      accessToken = at;
      expirationTime = new Date(createdAt).getTime() + ACCESS_TOKEN_TIME;
    },
    deleteAccessToken: () => {
      accessToken = null;
      expirationTime = null;
    },
  };
};

export { refreshTokenRotation };
