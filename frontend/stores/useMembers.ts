import { AxiosError } from 'axios';
import create from 'zustand';
import api from '../auth/api';

type Member = {
  userName: string;
  id: number;
  email: string;
};

interface Members {
  isLoading: boolean;
  error: AxiosError | null;
  isPatchLoading: boolean;
  patchError: AxiosError | null;
  member: Member;
  getMember: () => void;
  patchNickname: (data: string) => void;
}

const useMembers = create<Members>(set => ({
  isLoading: false,
  error: null,
  isPatchLoading: false,
  patchError: null,
  member: null,
  getMember: async () => {
    set({ isLoading: true });
    await api
      .get('/users')
      .then(res => {
        set({ member: res.data });
      })
      .catch(error => {
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  patchNickname: async data => {
    set({ isPatchLoading: true });
    await api
      .patch('/users', data)
      .then(res => {
        set({ member: res.data });
      })
      .catch(patchError => {
        set({ patchError });
      })
      .finally(() => {
        set({ isPatchLoading: false });
      });
  },
}));

export { useMembers };
