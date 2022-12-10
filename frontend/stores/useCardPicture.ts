import create from 'zustand';
import { AxiosError } from 'axios';
import visitorApi from '../auth/visitorApi';

// type Card = {
//   cardUrl: string;
// };

interface CardPicture {
  pictureUrl: string | null;
  setPictureUrl: (select: string) => void;
  constCard: string[];
  getConstCard: () => void;
  error: AxiosError | null;
  isLoading: boolean;
}

export const useCardPicture = create<CardPicture>(set => ({
  isLoading: false,
  pictureUrl: null,
  constCard: [],
  error: null,
  setPictureUrl: select => {
    set({ pictureUrl: select });
  },
  getConstCard: async () => {
    set({ isLoading: true });
    await visitorApi
      .get('/cards')
      .then(res => {
        console.log(res);
        set({ constCard: res.data });
      })
      .catch(error => {
        set({ error: error });
      })
      .finally(() => set({ isLoading: false }));
  },
}));
