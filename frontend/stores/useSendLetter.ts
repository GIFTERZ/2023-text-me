import axios, { AxiosError } from "axios";
import create from "zustand";

type LetterBody = {
  content: string;
  writer: string;
  cardImg: string;
};

interface SendLetter {
  loading: boolean;
  error: AxiosError | null;
  sendLetter: (data: LetterBody, callback: () => void) => void;
}

const useSendLetter = create<SendLetter>((set) => ({
  loading: false,
  error: null,
  sendLetter: async (data, callback) => {
    set({ loading: true });
    await axios
      .post("/letters", data)
      .then((res) => {
        callback();
      })
      .catch((error) => {
        set({ error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
}));

export { useSendLetter };
