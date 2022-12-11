import create from 'zustand';
import { AxiosError } from 'axios';
import visitorApi from '../auth/visitorApi';

interface CardPicture {
  pictureUrl: string | null;
  pictureImage: File | null;
  setPictureImage: (select: File) => void;
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
  pictureImage: null,
  setPictureUrl: select => {
    set({ pictureUrl: select });
  },
  getConstCard: async () => {
    set({ isLoading: true });
    await visitorApi
      .get('/cards')
      .then(res => {
        set({ constCard: res.data });
      })
      .catch(error => {
        set({ error: error });
      })
      .finally(() => set({ isLoading: false }));
  },
  setPictureImage: async (image: File) => {
    let formData = new FormData();
    formData.append('images', image);
    await visitorApi
      .post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        set({ pictureUrl: res.data });
      })
      .catch(error => console.log(error));
  },
}));
