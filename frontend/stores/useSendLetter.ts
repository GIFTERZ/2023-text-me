import axios, { AxiosError } from 'axios';
import internal from 'stream';
import create from 'zustand';
import visitor_api from '../auth/visitor_api';

type LetterBody = {
  receiverId: number;
  contents: string;
  senderName: string;
  imageUrl: string;
};

interface SendLetter {
  loading: boolean;
  error: AxiosError | null;
  sendLetter: (data: LetterBody, callback: () => void) => void;
}

const useSendLetter = create<SendLetter>(set => ({
  loading: false,
  error: null,
  sendLetter: async (data, callback) => {
    set({ loading: true });
    await visitor_api
      .post('/letters', data)
      .then(res => {
        callback();
      })
      .catch(error => {
        set({ error });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
}));

export { useSendLetter };
