import axios from "axios";
import create from "zustand";
import { deleteRefreshToken, getRefreshToken, setRefreshToken } from "./utils";

interface AccessTokenInfo {
  accessToken: string;
  expirationTime: number;
  setAccessToken: (accessToken: string, expirationTime: number) => void;
  getAccessToken: () => void;
  deleteTokens: () => void;
}

const useAccessToken = create<AccessTokenInfo>((set, get) => ({
  accessToken: null,
  expirationTime: null,
  setAccessToken: (accessToken: string, expirationTime: number) => {
    set({ accessToken, expirationTime });
  },
  getAccessToken: async () => {
    const refreshToken = getRefreshToken();
    const { accessToken, expirationTime, setAccessToken } = get();
    if (!accessToken || expirationTime < new Date().getTime()) {
      await axios
        .post("/api/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken, res.data.expirationTime);
          setRefreshToken(res.data.refreshToken);
        })
        .catch(() => {
          get().deleteTokens();
          alert("로그인이 만료 되었습니다.");
        });
    }
  },
  deleteTokens() {
    set({ accessToken: null, expirationTime: null });
    deleteRefreshToken();
  },
}));

export { useAccessToken };
