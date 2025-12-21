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
    signoutUser: (navigate: (path: string) => void) => void,
    signingUpUser: boolean,
    signUpError?: string | null,
    signUpUser: (name: string, email: string, password: string, navigate: (path: string) => void) => Promise<void>,
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
                const msg = res.data?.message;
                if (msg?.title && msg?.suggestion) {
                    set({ user: null, signInError: `${msg.title}: ${msg.suggestion}` });
                } else if (msg?.title) {
                    set({ user: null, signInError: msg.title });
                } else if (msg?.suggestion) {
                    set({ user: null, signInError: msg.suggestion });
                } else {
                    set({ user: null, signInError: "Login failed" });
                }
            }
        } catch (error) {
            set({ user: null });
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.message;
                if (msg?.title && msg?.suggestion) {
                    set({ signInError: `${msg.title}: ${msg.suggestion}` });
                } else if (msg?.title) {
                    set({ signInError: msg.title });
                } else if (msg?.suggestion) {
                    set({ signInError: msg.suggestion });
                } else {
                    set({ signInError: "Login failed" });
                }
            } else {
                set({ signInError: (error as Error).message || "Login failed" });
            }
        } finally {
            set({ signingInUser: false });
        }
    },
    signInError: null,
    signoutUser: async (navigate: (path: string) => void) => {
        set({ user: null });
        try {
            await api.post('/auth/signout');
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    },
    signingUpUser: false,
    signUpError: null,
    signUpUser: async (name: string, email: string, password: string, navigate: (path: string) => void) => {
        set({ signingUpUser: true, user: null, signUpError: null });
        try {
            const res = await api.post('/auth/signup', { userName: name, email, password });
            if (res.data && res.data.success && res.data.data) {
                set({ user: res.data.data, signUpError: null });
                navigate('/home');
            }
        } catch (error) {
            set({ user: null });
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.message;
                if (msg?.title && msg?.suggestion) {
                    set({ signUpError: `${msg.title}: ${msg.suggestion}` });
                } else if (msg?.title) {
                    set({ signUpError: msg.title });
                } else if (msg?.suggestion) {
                    set({ signUpError: msg.suggestion });
                } else {
                    set({ signUpError: "Signup failed" });
                }
            } else {
                set({ signUpError: (error as Error).message || "Signup failed" });
            }
        } finally {
            set({ signingUpUser: false });
        }
    }
}));

export default useUserAuthStore;