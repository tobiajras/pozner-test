import { create } from 'zustand';

type ProductType = {
  id: string;
  name: string;
  price: number;
  // Añade aquí otros campos que tenga tu producto
};

type CartItem = ProductType & {
  quantity: number;
  color?: string;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (product: ProductType, quantity: number, color?: string) => void;
  removeFromCart: (id: string, color?: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (product, quantity, color) =>
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === product.id && item.color === color
      );

      if (existingItemIndex > -1) {
        const newCart = [...state.cart];
        newCart[existingItemIndex].quantity += quantity;
        return { cart: newCart };
      }

      return {
        cart: [...state.cart, { ...product, quantity, color }],
      };
    }),
  removeFromCart: (id, color) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item.id === id && item.color === color)
      ),
    })),
  clearCart: () => set({ cart: [] }),
}));
