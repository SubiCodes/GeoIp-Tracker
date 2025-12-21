import { create } from 'zustand'
import axios from 'axios'
import type { IPGeoData } from './ipgeoStore';
import { toast } from 'sonner';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/',
    withCredentials: true,
});

interface IPHistoryStoreState {
    ipHistory: IPGeoData[];
    fetchingIPHistory: boolean;
    fetchingIPHistoryError?: string | null;
    fetchIPHistory: () => Promise<void>;
    addHistoryItem: (ip: string) => void;
}

export const useIPHistoryStore = create<IPHistoryStoreState>((set) => ({
    ipHistory: [],
    fetchingIPHistory: false,
    fetchingIPHistoryError: null,
    fetchIPHistory: async () => {
        set({ fetchingIPHistory: true, fetchingIPHistoryError: null });
        try {
            const res = await api.get('/ip-history');
            if (res.data && res.data.success && res.data.data) {
                set({ ipHistory: res.data.data });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.message;
                if (msg?.title && msg?.suggestion) {
                    set({ fetchingIPHistoryError: `${msg.title}: ${msg.suggestion}` });
                } else if (msg?.title) {
                    set({ fetchingIPHistoryError: msg.title });
                } else if (msg?.suggestion) {
                    set({ fetchingIPHistoryError: msg.suggestion });
                } else {
                    set({ fetchingIPHistoryError: "Fetching IP History failed" });
                }
            } else {
                set({ fetchingIPHistoryError: (error as Error).message || "Fetching IP History failed" });
            }
        } finally {
            set({ fetchingIPHistory: false });
        }
    },
    addHistoryItem: async (ip: string) => {
        try {
            toast.loading("Adding IP to history...");
            const res = await api.post('/ip-history', { ip });
            set((state) => ({ ipHistory: [...state.ipHistory, res.data] }));
            toast.success("New IP set as current IP and added to history!");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.message;
                if (msg?.title && msg?.suggestion) {
                    toast.error(`${msg.title}: ${msg.suggestion}`);
                } else if (msg?.title) {
                    toast.error(msg.title);
                } else if (msg?.suggestion) {
                    toast.error(msg.suggestion);
                } else {
                    toast.error("Fetching IP History failed");
                }
            } else {
                toast.error((error as Error).message || "Fetching IP History failed");
            }
        }
    },
}));