import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';

type User = {
    id: number;
    name: string;
    email: string;
};

type AuthStoreType = {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
};

const secureStorage = {
    async getItem(key: string) {
        const value = await SecureStore.getItemAsync(key);
        return value ? JSON.parse(value) : null;
    },
    async setItem(key: string, value: any) {
        await SecureStore.setItemAsync(key, JSON.stringify(value));
    },
    async removeItem(key: string) {
        await SecureStore.deleteItemAsync(key);
    },
}

export const useAuth = create<AuthStoreType>()(
    persist(
        (set) => (
            {
                user: null,
                token: null,
                isLoggedIn: false,
                setUser: (user: User) => set({user}),
                setToken: (token: string) => set({token}),
                setIsLoggedIn: (isLoggedIn: boolean) => set({isLoggedIn}),
            }),
            {
                name: 'auth-storage',
                storage: createJSONStorage(() => secureStorage),
                partialize: (state: AuthStoreType) => ({
                    user: state.user,
                    token: state.token,
                    isLoggedIn: state.isLoggedIn,
                }),
            })
);