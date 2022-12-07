import axios, { AxiosError } from "axios";
import create from "zustand";

interface Room {
  isLoading: boolean;
  error: AxiosError | null;
  roomInfo: { ownerName: string; userId: number };
  getRoomInfo: (userId: number) => void;
}

const useRoomInfo = create<Room>((set) => ({
  isLoading: false,
  error: null,
  roomInfo: null,
  getRoomInfo: async (userId: number) => {
    set({ isLoading: true });
    await axios
      .get("/room", { params: { userId } })
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
