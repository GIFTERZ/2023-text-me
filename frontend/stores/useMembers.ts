import axios, { AxiosError } from "axios";
import create from "zustand";

type Member = {
  nickname: string;
  id: number;
};

interface RoomEnter {
  isLoading: boolean;
  error: AxiosError | null;
  isPatchLoading: boolean;
  patchError: AxiosError | null;
  member: Member;
  getMember: () => void;
  patchNickname: (data: Member) => void;
}

const useMembers = create<RoomEnter>((set) => ({
  isLoading: false,
  error: null,
  isPatchLoading: false,
  patchError: null,
  member: null,
  getMember: async () => {
    set({ isLoading: true });
    await axios
      .get("/members")
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
    set({ isPatchLoading: true });
    await axios
      .patch("/members", data)
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
}));

export { useMembers };
