import { create } from "zustand"

const useSearchRegister = create(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useSearchRegister;
