import { create } from 'zustand';

const useStore = create((set) => ({
    cart: [],
    addToCart: (product) => set((state: any) => ({ cart: [...state.cart, {product, quantity: 1 }], })),
    removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((product) => product.id !== productId),
    })),
    updateCartItem: (productId, quantity) => set((state) => ({
        cart: state.cart.map((product) =>
            product.id === productId ? { ...product, quantity } : product
        ),
    })),
    clearCart: () => set({ cart: [] }),
}));

export default useStore;