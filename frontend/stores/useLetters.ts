import axios, { AxiosError } from "axios";
import create from "zustand";
import { Letter } from "../types";

interface Letters {
  isLoading: boolean;
  error: AxiosError | null;
  letters: Letter[];
  getLetters: (userId: number) => void;
}

const useLetters = create<Letters>((set) => ({
  isLoading: false,
  error: null,
  letters: [],
  getLetters: async (userId: number) => {
    set({ isLoading: true });
    await axios
      .get("/letters", { params: { userId } })
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
