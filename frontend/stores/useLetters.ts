import { AxiosError } from 'axios';
import create from 'zustand';
import { Letter } from '../types';
import api from '../auth/api';

interface Letters {
  isLoading: boolean;
  error: AxiosError | null;
  letters: Letter[];
  getLetters: (userId: number) => void;
}

const useLetters = create<Letters>(set => ({
  isLoading: false,
  error: null,
  letters: [],
  getLetters: async (userId: number) => {
    set({ isLoading: true });
    await api
      .get(`/letters/members/${userId}`)
      .then(res => {
        set({ letters: res.data });
      })
      .catch(error => {
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));

export { useLetters };
