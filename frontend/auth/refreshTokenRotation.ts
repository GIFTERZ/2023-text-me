import axios, { AxiosRequestConfig } from "axios";
import { deleteRefreshToken, getRefreshToken, setRefreshToken } from "./utils";

const api = axios.create();

const refreshTokenRotation = () => {
  let accessToken: string = null;
  let expirationTime: number = null;

  const setAccessToken = (at: string, et: number) => {
    accessToken = at;
    expirationTime = et;
  };

  const deleteTokens = () => {
    accessToken = null;
    expirationTime = null;
    deleteRefreshToken();
  };

  const moveHome = () => {
    window.location.href = "/";
  };

  const isExpired = () => {
    const now = new Date().getTime();
    return expirationTime < now;
  };

  const getNewTokens = async function () {
    const refreshToken = getRefreshToken();
    await axios
      .post("/api/refresh", {
        refreshToken,
      })
      .then((res) => {
        const {
          data: { accessToken, expirationTime, refreshToken },
        } = res;
        setAccessToken(accessToken, expirationTime);
        setRefreshToken(refreshToken);
      })
      .catch(() => {
        deleteTokens();
        alert("로그인이 만료되었습니다.");
        moveHome();
      });
  };

  return {
    setAuthHeader: async function (
      config: AxiosRequestConfig
    ): Promise<AxiosRequestConfig> {
      if (!accessToken || isExpired()) {
        console.log("no access token");
        await getNewTokens();
      }

      config.headers.Authorization = `Bearer ${accessToken}`;

      return config;
    },
  };
};

const { setAuthHeader } = refreshTokenRotation();

api.interceptors.request.use(setAuthHeader);

export default api;
