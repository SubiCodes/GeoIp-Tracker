/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'
import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/',
    withCredentials: true,
});

export interface User {
    userId: string
    email: string
    userName: string
}

interface UserAuthState {
    user: User | null,
    validatingUser: boolean,
    validateUser: () => Promise<void>,
}

const useUserAuthStore = create<UserAuthState>((set) => ({
    user: null,
    validatingUser: false,
    validateUser: async () => {
        set({ validatingUser: true, user: null });
        try {
            const res = await api.get('/auth/validate-cookie');
            if (res.data && res.data.success && res.data.data) {
                set({ user: res.data.data });
            } else {
                set({ user: null });
            }
        } catch (e) {
            set({ user: null });
        } finally {
            set({ validatingUser: false });
        }
    }
}));

export default useUserAuthStore;