import { AxiosError } from "axios";
import create from "zustand";
import visitorApi from "../auth/visitorApi";
import { PATH } from "../constants/api";
import { setAccessToken, setExpiryTime } from "../auth/utils";

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
    set({ loading: true });
    await visitorApi
      .post(PATH.USER.LOGIN.KAKAO, {
        authCode: code,
      })
      .then((res) => {
        const {
          data: { token },
        } = res;
        let createdTime = new Date().getTime();
        setAccessToken(token);
        setExpiryTime(createdTime);
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
