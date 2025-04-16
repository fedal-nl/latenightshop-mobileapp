import { create } from 'zustand';
import { ProductType } from '@/types/product';
import { CartItemType } from '@/types/cart';

  

  type Store = {
    cart: CartItemType[];
    addToCart: (product: ProductType) => void;
    removeFromCart: (productId: number) => void;
    updateCartItem: (productId: number, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
  };

const useStore = create<Store>((set, get) => ({
    cart: [],
    addToCart: (product) => set((state: any) => ({ cart: [...state.cart, {product, quantity: 1 }], })),
    removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((item) => Number(item.product.id) !== Number(productId)),
    })),
    updateCartItem: (productId, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
            Number(item.product.id) === Number(productId) ? { ...item, quantity } : item
        ),
    })),
    clearCart: () => set({ cart: [] }),
    getTotalItems: () => {
        const cart = get().cart;
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

}));

export default useStore;