import { create } from 'zustand';

const useStore = create((set) => ({
    cart: [],
    addToCart: (product) => set((state: any) => ({ cart: [...state.cart, {product, quantity: 1 }], })),
    removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((item) => item.product.id !== productId),
    })),
    updateCartItem: (productId, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
        ),
    })),
    clearCart: () => set({ cart: [] }),
}));

export default useStore;