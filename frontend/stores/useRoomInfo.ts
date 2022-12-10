import axios, { AxiosError } from 'axios';
import create from 'zustand';
import visitorApi from '../auth/visitorApi';

interface Room {
  isLoading: boolean;
  error: AxiosError | null;
  roomInfo: { userName: string; id: number; email: string };
  getRoomInfo: (userId: number) => void;
}

const useRoomInfo = create<Room>(set => ({
  isLoading: false,
  error: null,
  roomInfo: null,
  getRoomInfo: async (userId: number) => {
    set({ isLoading: true });
    await visitorApi
      .get(`/users/find/${userId}`)
      .then(res => {
        set({ roomInfo: res.data, error: null });
      })
      .catch(error => {
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));

export { useRoomInfo };
