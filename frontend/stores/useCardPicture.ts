import create from 'zustand';

interface cardPicture {
  pictureURL: String;
  setPictureURL: (select: String) => void;
}

export const useCardPicture = create<cardPicture>(set => ({
  pictureURL: '',
  setPictureURL: select => {
    set(state => ({ ...state, pictureURL: select }));
  },
}));
