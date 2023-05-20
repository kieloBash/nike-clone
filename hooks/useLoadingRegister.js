import { create } from "zustand";

const useLoadingRegister = create((set) => ({
  isOpen: true,
  setClose: () => set({ isOpen: false }),
  setOpen: () => set({ isOpen: true }),
}));

export default useLoadingRegister;
