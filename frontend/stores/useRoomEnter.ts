import axios, { AxiosError } from "axios";
import create from "zustand";

interface RoomEnter {
  isLoading: boolean;
  error: AxiosError | null;
  postEmail: (data: { email: string }, callback: (id: number) => void) => void;
}

const useRoomEnter = create<RoomEnter>((set) => ({
  isLoading: false,
  error: null,
  postEmail: async (data, callback) => {
    set({ isLoading: true });
    await axios
      .post("/room", data)
      .then((res) => {
        callback(res.data.roomId);
      })
      .catch((error) => {
        set({ error });
      });
    set({ isLoading: false });
  },
}));

export { useRoomEnter };
