import { create } from 'zustand'
import axios from 'axios'
import type { IPGeoData } from './ipgeoStore';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/',
    withCredentials: true,
});

interface SearchStoreState {
    recentSearches: string[];
    fetchingRecentSearches: boolean;
    fetchingRecentSearchesError?: string | null;
    fetchRecentSearches: () => Promise<void>;
    searching: boolean;
    searchError?: string | null;
    search: (query: string) => Promise<IPGeoData[]>;
    suggestions: IPGeoData[];
    fetchingSuggestions: boolean;
    fetchSuggestions: (query: string) => Promise<void>;
    deleteSearchHistoryItem: (query: string) => Promise<void>;
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
    },
    searching: false,
    searchError: null,
    search: async (query: string) => {
        set({ searching: true, searchError: null });
        try {
            const res = await api.post(`/search`, { query });
            if (res.data && res.data.success && res.data.data) {
                return res.data.data;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.message;
                if (msg?.title && msg?.suggestion) {
                    set({ searchError: `${msg.title}: ${msg.suggestion}` });
                } else if (msg?.title) {
                    set({ searchError: msg.title });
                } else if (msg?.suggestion) {
                    set({ searchError: msg.suggestion });
                } else {
                    set({ searchError: "Fetching search results failed" });
                }
            } else {
                set({ searchError: (error as Error).message || "Fetching search results failed" });
            }
        } finally {
            set({ searching: false });
        }
    },
    suggestions: [],
    fetchingSuggestions: false,
    fetchSuggestions: async (query: string ) => {
        set({ fetchingSuggestions: true });
        try {
            const res = await api.post('/search/suggestions', { query });
            if (res.data && res.data.success && res.data.data) {
                set({ suggestions: res.data.data });
            }
        } catch (error) {
            console.error("Fetching suggestions failed:", error);
        } finally {
            set({ fetchingSuggestions: false });
        }
    },
    deleteSearchHistoryItem: async (query: string) => {
        try {
            set((state) => ({ recentSearches: state.recentSearches.filter(item => item !== query) }));
            await api.post(`/search/delete`, { query });
        } catch (error) {
            console.error("Deleting search history item failed:", error);
        }
    }
}));