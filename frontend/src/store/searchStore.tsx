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
    search: (query: string) => Promise<IPGeoData[] | undefined>;
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
            
            // Backend returns results in "resutls" (typo in backend)
            if (res.data && res.data.success && res.data.resutls) {
                set((state) => state.recentSearches.includes(query) ? state : { recentSearches: [query, ...state.recentSearches] });
                return res.data.resutls;
            }
            
            console.log('⚠️ No results found in expected location');
            console.log('Available keys:', Object.keys(res.data || {}));
            return undefined;
        } catch (error) {
            console.error('❌ Search error:', error);
            if (axios.isAxiosError(error)) {
                console.error('Response data:', error.response?.data);
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
            return undefined;
        } finally {
            set({ searching: false });
        }
    },
    suggestions: [],
    fetchingSuggestions: false,
    fetchSuggestions: async (query: string) => {
        set({ fetchingSuggestions: true });
        try {
            const res = await api.post('/search/suggestions', { query });
            if (res.data && res.data.success && res.data.data) {
                set({ suggestions: res.data.data });
            } else {
                set({ suggestions: [] });
            }
        } catch (error) {
            console.error("Fetching suggestions failed:", error);
            set({ suggestions: [] });
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