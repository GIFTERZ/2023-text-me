import { AxiosError } from "axios";
import create from "zustand";
import api from "../auth/api";
import { setCookie } from "../auth/Cookie";
import { PATH } from "../constants/api";
import { STORAGE_NAME } from "../constants/token";

type Member = {
  id: string;
  userName: string;
  email: string;
};

interface Members {
  isLoading: boolean;
  error: AxiosError | null;
  isPatchLoading: boolean;
  patchError: AxiosError | null;
  member: Member | null;
  getMember: () => void;
  logoutMember: () => void;
  patchNickname: (data: string) => void;
}

const useMembers = create<Members>((set) => ({
  isLoading: false,
  error: null,
  isPatchLoading: false,
  patchError: null,
  member: null,
  getMember: async () => {
    set({ isLoading: true, error: null });
    await api
      .get(PATH.USER.ROOT)
      .then((res) => {
        set({ member: res.data });
      })
      .catch((error) => {
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  patchNickname: async (data) => {
    set({ isPatchLoading: true, patchError: null });
    await api
      .patch(PATH.USER.ROOT, null, { params: { name: data } })
      .then((res) => {
        set({ member: res.data });
      })
      .catch((patchError) => {
        set({ patchError });
      })
      .finally(() => {
        set({ isPatchLoading: false });
      });
  },
  logoutMember: () => {
    set({ member: null });
    setCookie(STORAGE_NAME.ACCESS_TOKEN, null);
  },
}));

export { useMembers };
