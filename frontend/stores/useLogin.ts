import { AxiosError } from "axios";
import create from "zustand";
import visitorApi from "../auth/visitorApi";
import { FieldValues } from "react-hook-form";
import { setAccessToken, setExpiryTime } from "../utils/setAccessToken";

interface Login {
  loading: boolean;
  error: AxiosError | null;
  getToken: (data: FieldValues, callback: Function) => void;
}

const useLogin = create<Login>((set) => ({
  loading: false,
  error: null,
  getToken: async (data, callback) => {
    await visitorApi
      .post("/users/login", data)
      .then((res) => {
        const {
          data: { token },
        } = res;
        let createdTime = new Date().getTime();
        setAccessToken(token);
        setExpiryTime(createdTime);
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
