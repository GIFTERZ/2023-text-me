import axios, { AxiosError } from "axios";
import create from "zustand";
import visitorApi from "../auth/visitorApi";
import { setCookie } from "../auth/Cookie";

type LoginBody = {
  code: string;
};

interface KakaoLogin {
  loading: boolean;
  error: AxiosError | null;
  getKakaoToken: (data: LoginBody) => void;
}

const useKakaoLogin = create<KakaoLogin>((set) => ({
  loading: false,
  error: null,
  getKakaoToken: async ({ code }) => {
    const ACCESS_EXPIRY_TIME = 36000000;

    set({ loading: true });
    await visitorApi
      .post("/users/kakao-login", {
        accessToken: code,
      })
      .then((res) => {
        let createdTime = new Date().getTime();
        const {
          data: { token },
        } = res;
        setCookie("textMeAccessToken", token);
        localStorage.setItem(
          "textMeAccessExpiryTime",
          (createdTime + ACCESS_EXPIRY_TIME).toString()
        );
      })
      .catch((error) => {
        set({ error });

        if (error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("에러가 발생했습니다.");
        }
      })
      .finally(() => {
        set({ loading: false });
      });
  },
}));

export { useKakaoLogin };
