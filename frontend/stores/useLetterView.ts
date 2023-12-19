import { AxiosError } from "axios";
import create from "zustand";
import { Letter } from "../types";
import api from "../auth/api";
import visitorApi from "../auth/visitorApi";
import { PATH } from "../constants/api";

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
    await api
      .get(PATH.LETTER.GET_ONE(letterId))
      .then((res) => {
        set({ letter: res.data, error: null });
      })
      .catch((error) => {
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  open: (id: number) => set({ isOpened: true, id: id }),
  close: () => set({ isOpened: false, id: null }),
}));

export { useLetterView };
