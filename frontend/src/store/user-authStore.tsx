import { create } from 'zustand'
import axios from 'axios'
import { toast } from "sonner";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ||'http://localhost:3000/',
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
            const res = await api.get('/auth/validate-user');
            if (res.data && res.data.success && res.data.data) {
                set({ user: res.data.data });
            } else {
                set({ user: null });
                toast.error(res.data?.message?.title || "Validation failed", {
                    description: res.data?.message?.suggestion || "Could not validate user."
                });
            }
        } catch (error) {
            set({ user: null });
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.message;
                toast.error(msg?.title || "Validation failed", {
                    description: msg?.suggestion || error.message
                });
            } else {
                toast.error("Validation failed", { description: (error as Error).message });
            }
        } finally {
            set({ validatingUser: false });
        }
    }
}));

export default useUserAuthStore;