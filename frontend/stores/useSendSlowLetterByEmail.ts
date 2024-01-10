import { AxiosError } from "axios";
import create from "zustand";
import visitorApi from "../auth/visitorApi";
import { PATH } from "../constants/api";

type LetterBody = {
  email: string;
  contents: string;
  senderName: string;
  imageUrl: string;
};

interface SendLetter {
  loading: boolean;
  error: AxiosError | null;
  sendLetter: (data: LetterBody, callback: () => void) => void;
}

const useSendSlowLetterByEmail = create<SendLetter>((set) => ({
  loading: false,
  error: null,
  sendLetter: async (data, callback) => {
    set({ loading: true });
    await visitorApi
      .post(PATH.LETTER.SEND("email"), data)
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

export { useSendSlowLetterByEmail };
