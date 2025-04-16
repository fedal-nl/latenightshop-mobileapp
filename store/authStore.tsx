import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { UserType } from '@/types/user';
import { AuthStoreType } from '@/types/auth';

// used the expo-secure-store to store the user data securely because the localStorage & the AsyncStorage are not secure
// and can be accessed by other apps on the device. So do not store tokens or sensitive data in the localStorage or AsyncStorage.



// The secureStorage object is used to store the user data securely using the expo-secure-store. 
// It expects the three methods: getItem, setItem, and removeItem.
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
                setUser: (user: UserType) => set({user}),
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
            }
    )
);