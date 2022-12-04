import create from 'zustand';

interface LetterInfo {
  letterContents: string | null;
  letterSender: string | null;
  setLetterContents: (select: string) => void;
  setLetterSender: (select: string) => void;
}

export const useLetterInfo = create<LetterInfo>(set => ({
  letterContents: '',
  letterSender: '',
  setLetterContents: select => {
    set({ letterContents: select });
  },
  setLetterSender: select => {
    set({ letterSender: select });
  },
}));
