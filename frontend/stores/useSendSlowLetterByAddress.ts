import { AxiosError } from "axios";
import create from "zustand";
import visitorApi from "../auth/visitorApi";
import { PATH } from "../constants/api";

type LetterBody = {
  name: string;
  zonecode: string;
  defaultAddress: string;
  detailAddress: string;
  phoneNumber: string;
  contents: string;
};

interface SendLetter {
  loading: boolean;
  error: AxiosError | null;
  sendLetter: (data: LetterBody, callback: () => void) => void;
}

const useSendSlowLetterByAddress = create<SendLetter>((set) => ({
  loading: false,
  error: null,
  sendLetter: async (
    { name, zonecode, defaultAddress, detailAddress, phoneNumber, contents },
    callback
  ) => {
    set({ loading: true });
    await visitorApi
      .post(PATH.LETTER.SEND("address"), {
        receiverName: name,
        postCode: zonecode,
        address: defaultAddress,
        addressDetail: detailAddress,
        phoneNumber,
        contents,
      })
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

export { useSendSlowLetterByAddress };
