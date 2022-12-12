import axios, { AxiosError } from "axios";
import create from "zustand";
import visitorApi from "../auth/visitorApi";

interface Room {
  isLoading: boolean;
  error: AxiosError | null;
  roomInfo: { userName: string; id: string; email: string };
  getRoomInfo: (userId: string) => void;
}

const useRoomInfo = create<Room>((set) => ({
  isLoading: false,
  error: null,
  roomInfo: null,
  getRoomInfo: async (userId: string) => {
    set({ isLoading: true, error: null });
    await visitorApi
      .get(`/users/find/${userId}`)
      .then((res) => {
        set({ roomInfo: res.data });
      })
      .catch((error) => {
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));

export { useRoomInfo };
