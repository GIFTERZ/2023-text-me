import create from "zustand";
import { AxiosError } from "axios";
import visitorApi from "../auth/visitorApi";
import { PATH } from "../constants/api";

interface CardPicture {
  pictureUrl: string | null;
  pictureImage: File | null;
  setPictureImage: (select: File, callback: () => void) => void;
  setPictureUrl: (select: string) => void;

  constCard: string[];
  getConstCard: () => void;
  setConstCard: (constCard: string[]) => void;
  error: AxiosError | null;
  isLoading: boolean;
}

export const useCardPicture = create<CardPicture>((set) => ({
  isLoading: false,
  pictureUrl: null,
  constCard: [],
  error: null,
  pictureImage: null,
  setPictureUrl: (select) => {
    set({ pictureUrl: select });
  },
  getConstCard: async () => {
    set({ isLoading: true });
    await visitorApi
      .get(PATH.CARD.ROOT)
      .then((res) => {
        set({ constCard: res.data });
      })
      .catch((error) => {
        set({ error: error });
      })
      .finally(() => set({ isLoading: false }));
  },
  setConstCard: (constCard: string[]) => {
    set({ constCard });
  },
  setPictureImage: async (image: File, callback: () => void) => {
    let formData = new FormData();
    formData.append("images", image);
    await visitorApi
      .post(PATH.UPLOAD.FILES, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        set({ pictureUrl: res.data });
        callback();
      })
      .catch((error) => {
        if (error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("에러가 발생했습니다.");
        }
      });
  },
}));
