import create from 'zustand';

interface CardPicture {
  pictureUrl: string | null;
  setPictureUrl: (select: string) => void;
  pictureDate: Date | null;
  setPictureDate: (select: Date) => void;
  pictureComment: string;
  setPictureComment: (select: string) => void;
}

export const useCardPicture = create<CardPicture>(set => ({
  pictureUrl: null,
  pictureDate: null,
  pictureComment: '',
  setPictureUrl: select => {
    set({ pictureUrl: select });
  },
  setPictureDate: select => {
    set({ pictureDate: select });
  },
  setPictureComment: select => {
    set({ pictureComment: select });
  },
}));
