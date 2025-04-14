import { create } from 'zustand';

type Product = {
    name: string;
    id: number;
    description: string;
    price: number;
    image: string;
  };
  
  type CartItem = {
    product: Product;
    quantity: number;
  };
  
  type Store = {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateCartItem: (productId: string, quantity: number) => void;
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