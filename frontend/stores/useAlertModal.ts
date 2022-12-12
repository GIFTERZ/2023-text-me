import create from 'zustand';

interface AlertModal {
  alertModalOpen: boolean;
  toggleAlertModalOpen: () => void;
  alertEmptyLetterModalOpen: boolean;
  toggleEmptyLetterModalOpen: () => void;
}

const useAlertModal = create<AlertModal>((set, get) => ({
  alertModalOpen: false,
  alertEmptyLetterModalOpen: false,
  toggleAlertModalOpen: () => {
    set({ alertModalOpen: !get().alertModalOpen });
  },
  toggleEmptyLetterModalOpen: () => {
    set({ alertEmptyLetterModalOpen: !get().alertEmptyLetterModalOpen });
  },
}));

export { useAlertModal };
