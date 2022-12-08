import create from 'zustand';
import { AxiosError } from 'axios';
import visitor_api from '../auth/visitor_api';

type Card = {
  id: number;
  cardUrl: string;
};

interface CardPicture {
  pictureUrl: string | null;
  setPictureUrl: (select: string) => void;
  constCard: Card[];
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
    await visitor_api
      .get('/cards')
      .then(res => {
        set({ constCard: res.data });
      })
      .catch(error => {
        set({ error: error });
      })
      .finally(() => set({ isLoading: false }));
  },
}));
