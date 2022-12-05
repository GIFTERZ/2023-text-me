import axios, { AxiosError } from "axios";
import create from "zustand";
import { Letter } from "../types";

interface LetterView {
  id: number | null;
  isOpened: boolean;
  isLoading: boolean;
  error: AxiosError | null;
  letter: Letter | null;
  getLetter: () => void;
  open: (id: number) => void;
  close: () => void;
}

const useLetterView = create<LetterView>((set, get) => ({
  id: null,
  isOpened: false,
  isLoading: false,
  error: null,
  letter: null,
  getLetter: async () => {
    const letterId = get().id;
    set({ isLoading: true });
    await axios
      .get(`/letters/${letterId}`)
      .then((res) => {
        set({ letter: res.data });
      })
      .catch((error) => {
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  open: (id: number) => set({ isOpened: true, id }),
  close: () => set({ isOpened: false, id: null }),
}));

export { useLetterView };
