import { create } from 'zustand'

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
            //
        } catch (error) {
            //
        } finally {
            set({ validatingUser: false });
        }
    }
}));

export default useUserAuthStore;