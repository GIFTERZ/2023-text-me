import create from 'zustand';

interface CardPicture {
  pictureUrl: string | null;
  setPictureUrl: (select: string) => void;
}

export const useCardPicture = create<CardPicture>(set => ({
  pictureUrl: null,
  setPictureUrl: select => {
    set({ pictureUrl: select });
  },
}));
