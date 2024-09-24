import { create } from 'zustand';

interface NavbarStore {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (aa: boolean) => void;
}

export const useNavbarStore = create<NavbarStore>((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),
  isCartOpen: false,
  setIsCartOpen: (isCartOpen) => set({ isCartOpen }),
}));
