import axios, { AxiosError } from 'axios';
import create from 'zustand';
import api from '../auth/api';

type DataType = {
  email: string;
};

interface RoomEnter {
  isLoading: boolean;
  error: AxiosError | null;
  enter: (data: DataType, callback: (id: number) => void) => void;
}

const useRoomEnter = create<RoomEnter>(set => ({
  isLoading: false,
  error: null,
  enter: async (data, callback) => {
    set({ isLoading: true });
    await api
      .post('/users/find', data)
      .then(res => {
        callback(res.data.id);
      })
      .catch(error => {
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));

export { useRoomEnter };
