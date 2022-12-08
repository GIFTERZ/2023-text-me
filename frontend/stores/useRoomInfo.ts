import axios, { AxiosError } from 'axios';
import create from 'zustand';
import visitor_api from '../auth/visitor_api';

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
    await visitor_api
      .get(`/users/find/${userId}`)
      .then(res => {
        set({ roomInfo: res.data });
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
