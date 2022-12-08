import create from "zustand";

interface LetterPagination {
  pagination: number;
  lastPage: number;
  setPagination: (pagination: number) => void;
  setLastPage: (lastPage: number) => void;
}

const useLetterPagination = create<LetterPagination>((set) => ({
  pagination: 0,
  lastPage: 0,
  setPagination: (pagination) => {
    set({ pagination });
  },
  setLastPage: (lastPage) => {
    set({ lastPage });
  },
}));

export { useLetterPagination };
