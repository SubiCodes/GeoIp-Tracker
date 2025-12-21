import { create } from 'zustand'
import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/',
    withCredentials: true,
});


export interface IPGeoData {
    ip: string;
    success: boolean;
    type: string;
    continent: string;
    continent_code: string;
    country: string;
    country_code: string;
    region: string;
    region_code: string;
    city: string;
    latitude: number;
    longitude: number;
    is_eu: boolean;
    postal?: string;
    calling_code?: string;
    capital?: string;
    borders?: string;
    flag?: {
        img?: string;
        emoji?: string;
        emoji_unicode?: string;
    };
    connection?: {
        asn?: number;
        org?: string;
        isp?: string;
        domain?: string;
    };
    timezone?: {
        id?: string;
        abbr?: string;
        is_dst?: boolean;
        offset?: number;
        utc?: string;
        current_time?: string;
    };
    description?: string;
};

interface IPGeoStoreState {
    currentIPGeo: IPGeoData | null,
    fetchingCurrentIPGeo: boolean,
    fetchCurrentIPGeo: () => Promise<void>,
    fetcingCurrentIPGeoError?: string | null,
    ipGeoDatas: IPGeoData[] | null,
    fetchingIPGeoDatas: boolean,
    fetchIPGeoDatas: () => Promise<void>,
    fetcingIPGeoDatasError?: string | null,
    addingIPGeoData: boolean,
    addIPGeoData: (ip: string, description?: string) => Promise<void>,
    addingIPGeoDataError?: string | null,
};

export const useIPGeoStore = create<IPGeoStoreState>((set) => ({
    currentIPGeo: null,
    fetchingCurrentIPGeo: false,
    fetchCurrentIPGeo: async () => {
        set({ fetchingCurrentIPGeo: true, fetcingCurrentIPGeoError: null });
        try {
            const res = await axios.get('https://ipwho.is/');
            if (res.data && res.data.success) {
                set({ currentIPGeo: res.data });
            };
        } catch (error) {
            set({ currentIPGeo: null });
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.message;
                if (msg?.title && msg?.suggestion) {
                    set({ fetcingCurrentIPGeoError: `${msg.title}: ${msg.suggestion}` });
                } else if (msg?.title) {
                    set({ fetcingCurrentIPGeoError: msg.title });
                } else if (msg?.suggestion) {
                    set({ fetcingCurrentIPGeoError: msg.suggestion });
                } else {
                    set({ fetcingCurrentIPGeoError: "Unable to get your current IP geolocation." });
                }
            } else {
                set({ fetcingCurrentIPGeoError: (error as Error).message || "Unable to get your current IP geolocation." });
            }
        } finally {
            set({ fetchingCurrentIPGeo: false });
        }
    },
    fetcingCurrentIPGeoError: null,
    ipGeoDatas: null,
    fetchingIPGeoDatas: false,
    fetchIPGeoDatas: async () => {
        set({ fetchingIPGeoDatas: true, fetcingIPGeoDatasError: null, ipGeoDatas: null });
        try {
            const res = await api.get('/ipgeo');
            if (res.data && res.data.success && res.data.data) {
                set({ ipGeoDatas: res.data.data });
            };
        } catch (error) {
            set({ currentIPGeo: null });
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.message;
                if (msg?.title && msg?.suggestion) {
                    set({ fetcingIPGeoDatasError: `${msg.title}: ${msg.suggestion}` });
                } else if (msg?.title) {
                    set({ fetcingIPGeoDatasError: msg.title });
                } else if (msg?.suggestion) {
                    set({ fetcingIPGeoDatasError: msg.suggestion });
                } else {
                    set({ fetcingIPGeoDatasError: "Unable to get your saved IP geolocations." });
                }
            } else {
                set({ fetcingIPGeoDatasError: (error as Error).message || "Unable to get your saved IP geolocations." });
            }
        } finally {
            set({ fetchingIPGeoDatas: false });
        }
    },
    fetcingIPGeoDatasError: null,
    addingIPGeoData: false,
    addIPGeoData: async (ip: string, description?: string) => {
        
    },
    addingIPGeoDataError: null,
}));