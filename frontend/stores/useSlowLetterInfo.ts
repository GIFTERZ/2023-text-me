import create from "zustand";
export interface Address {
  receiverName?: string;
  zonecode: string;
  defaultAddress: string;
  detailAddress?: string;
  phoneNumber?: string;
}
interface SlowLetterInfo {
  email: string;
  address: Address;
  setEmail: (email: string) => void;
  setAddress: (address: Address) => void;
}

const useSlowLetterInfo = create<SlowLetterInfo>((set, get) => ({
  email: null,
  address: {
    receiverName: null,
    zonecode: null,
    defaultAddress: null,
    detailAddress: null,
    phoneNumber: null,
  },
  setEmail: (email) => {
    set({ email });
  },
  setAddress: (address) => set({ address: { ...get().address, ...address } }),
}));

export { useSlowLetterInfo };
