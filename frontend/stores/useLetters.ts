import { AxiosError } from "axios";
import create from "zustand";
import { Letter } from "../types";
import visitorApi from "../auth/visitorApi";
import { PATH } from "../constants/api";

interface Letters {
  isLoading: boolean;
  error: AxiosError | null;
  letters: Letter[];
  getLetters: (userId: string) => void;
}

const useLetters = create<Letters>((set) => ({
  isLoading: false,
  error: null,
  letters: [],
  getLetters: async (userId: string) => {
    set({ isLoading: true });
    await visitorApi
      .get(PATH.LETTER.GET_MEMBER_ALL(userId))
      .then((res) => {
        set({ letters: res.data });
      })
      .catch((error) => {
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));

export { useLetters };
