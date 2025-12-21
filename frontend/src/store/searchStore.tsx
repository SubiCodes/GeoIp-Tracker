import { create } from 'zustand'
import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/',
    withCredentials: true,
});

interface SearchStoreState {
    recentSearches: string[];
    fetchingRecentSearches: boolean;
    fetchingRecentSearchesError?: string | null;
    fetchRecentSearches: () => Promise<void>;
}

export const useSearchStore = create<SearchStoreState>((set) => ({
    recentSearches: [],
    fetchingRecentSearches: false,
    fetchingRecentSearchesError: null,
    fetchRecentSearches: async () => {
        set({ fetchingRecentSearches: true, fetchingRecentSearchesError: null });
        try {
            const res = await api.get('/search');
            if (res.data && res.data.success && res.data.data) {
                set({ recentSearches: res.data.data });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.message;
                if (msg?.title && msg?.suggestion) {
                    set({ fetchingRecentSearchesError: `${msg.title}: ${msg.suggestion}` });
                } else if (msg?.title) {
                    set({ fetchingRecentSearchesError: msg.title });
                } else if (msg?.suggestion) {
                    set({ fetchingRecentSearchesError: msg.suggestion });
                } else {
                    set({ fetchingRecentSearchesError: "Fetching Recent Searches failed" });
                }
            } else {
                set({ fetchingRecentSearchesError: (error as Error).message || "Fetching Recent Searches failed" });
            }
        } finally {
            set({ fetchingRecentSearches: false });
        }
    }
}));