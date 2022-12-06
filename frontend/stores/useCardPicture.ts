import create from 'zustand';
import axios, { AxiosError } from 'axios';

type Card = {
  id: number;
  cardUrl: string;
};

interface CardPicture {
  pictureUrl: string | null;
  setPictureUrl: (select: string) => void;
  pictureDate: Date | null;
  setPictureDate: (select: Date) => void;
  pictureComment: string;
  setPictureComment: (select: string) => void;
  constCard: Card[];
  getConstCard: () => void;
  error: AxiosError | null;
  isLoading: boolean;
}

export const useCardPicture = create<CardPicture>(set => ({
  isLoading: false,
  pictureUrl: null,
  pictureDate: null,
  pictureComment: '',
  constCard: [],
  error: null,
  setPictureUrl: select => {
    set({ pictureUrl: select });
  },
  setPictureDate: select => {
    set({ pictureDate: select });
  },
  setPictureComment: select => {
    set({ pictureComment: select });
  },
  getConstCard: async () => {
    set({ isLoading: true });
    await axios
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
