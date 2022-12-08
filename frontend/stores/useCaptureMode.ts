import create from "zustand";

interface CaptureMode {
  isCaptureMode: boolean;
  modalOpen: boolean;
  toggleCaptureMode: () => void;
  toggleModalOpen: () => void;
}

const useCaptureMode = create<CaptureMode>((set, get) => ({
  isCaptureMode: false,
  modalOpen: false,
  toggleCaptureMode: () => {
    set({ isCaptureMode: !get().isCaptureMode });
  },
  toggleModalOpen: () => {
    set({ modalOpen: !get().modalOpen });
  },
}));

export { useCaptureMode };
