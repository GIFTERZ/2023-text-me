import { AxiosError } from "axios";
import create from "zustand";
import visitorApi from "../auth/visitorApi";
import { FieldValues } from "react-hook-form";
import { setRefreshToken } from "../auth/utils";
import { PATH } from "../constants/api";
import { refreshTokenRotation } from "../auth/refreshTokenRotation";

interface Login {
  loading: boolean;
  error: AxiosError | null;
  getToken: (data: FieldValues, callback: Function) => void;
}

const useLogin = create<Login>((set) => ({
  loading: false,
  error: null,
  getToken: async (data, callback) => {
    const { setAccessToken } = refreshTokenRotation();
    await visitorApi
      .post(PATH.USER.LOGIN.EMAIL, data)
      .then((res) => {
        const {
          data: { accessToken, refreshToken, createdAt },
        } = res;
        setAccessToken(accessToken, createdAt);
        setRefreshToken(refreshToken);
      })
      .catch((error) => {
        if (error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("에러가 발생했습니다.");
        }
      })
      .finally(() => {
        callback();
      });
  },
}));

export { useLogin };
