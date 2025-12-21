import { create } from 'zustand'
import axios from 'axios'

export interface IPGeoData {
    _id?: string;
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
    displayedIPGeoData: IPGeoData | null;
    displayingIPGeoData: boolean;
    displayingIPGeoDataError?: string | null;
    displayIPGeoData: (ip?: string) => Promise<void>;
};

export const useIPGeoStore = create<IPGeoStoreState>((set) => ({
    displayedIPGeoData: null,
    displayingIPGeoData: false,
    displayingIPGeoDataError: null,
    displayIPGeoData: async (ip?: string) => {
        set({ displayingIPGeoData: true, displayingIPGeoDataError: null, displayedIPGeoData: null });
        try {
            const res = await axios.get(`https://ipwho.is/${ip || ''}`);
            set({ displayedIPGeoData: res.data });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.message;
                if (msg?.title && msg?.suggestion) {
                    set({ displayingIPGeoDataError: `${msg.title}: ${msg.suggestion}` });
                } else if (msg?.title) {
                    set({ displayingIPGeoDataError: msg.title });
                } else if (msg?.suggestion) {
                    set({ displayingIPGeoDataError: msg.suggestion });
                } else {
                    set({ displayingIPGeoDataError: "Displaying IP Geo Data failed" });
                }
            } else {
                set({ displayingIPGeoDataError: (error as Error).message || "Displaying IP Geo Data failed" });
            }
        } finally {
            set({ displayingIPGeoData: false });
        }
    }
}));