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
    validateUser: (navigate: (path: string) => void) => Promise<void>,
    signingInUser: boolean,
    sigInUser: (email: string, password: string, navigate: (path: string) => void) => Promise<void>,
    signInError?: string | null,
    logoutUser: (navigate: (path: string) => void) => void,
}

const useUserAuthStore = create<UserAuthState>((set) => ({
    user: null,
    validatingUser: false,
    validateUser: async (navigate: (path: string) => void) => {
        set({ validatingUser: true, user: null });
        try {
            const res = await api.get('/auth/validate-cookie');
            if (res.data && res.data.success && res.data.data) {
                set({ user: res.data.data });
                navigate('/home');
            } else {
                set({ user: null });
            }
        } catch (e) {
            set({ user: null });
        } finally {
            set({ validatingUser: false });
        }
    },
    signingInUser: false,
    sigInUser: async (email: string, password: string, navigate: (path: string) => void) => {
        set({ signingInUser: true, user: null, signInError: null });
        try {
            const res = await api.post('/auth/signin', { email, password });
            if (res.data && res.data.success && res.data.data) {
                set({ user: res.data.data, signInError: null });
                navigate('/home');
            } else {
                set({ user: null, signInError: res.data?.message?.title || "Login failed" });
            }
        } catch (error) {
            set({ user: null });
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.message;
                set({ signInError: msg?.title || "Login failed" });
            } else {
                set({ signInError: (error as Error).message || "Login failed" });
            }
        } finally {
            set({ signingInUser: false });
        }
    },
    signInError: null,
    logoutUser: async (navigate: (path: string) => void) => {
        set({ user: null });
        try {
            await api.post('/auth/logout');
            navigate('/signin');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
}));

export default useUserAuthStore;