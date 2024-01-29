import { AxiosError } from "axios";
import create from "zustand";
import api from "../auth/api";
import { refreshTokenRotation } from "../auth/refreshTokenRotation";
import { deleteRefreshToken } from "../auth/utils";
import { PATH } from "../constants/api";

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
    const { deleteAccessToken } = refreshTokenRotation();
    set({ member: null });
    deleteRefreshToken();
    deleteAccessToken();
  },
}));

export { useMembers };
