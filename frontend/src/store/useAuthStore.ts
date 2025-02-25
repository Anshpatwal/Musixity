import { axiosInstance } from '@/lib/axios'
import { create } from 'zustand'

interface AuthStore {
    isAdmin: boolean,
    error: string | null,
    isLoading: boolean,
    checkAdminStatus: () => Promise<void>,
    reset: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAdmin: false,
    error: null,
    isLoading: false,
    checkAdminStatus: async () => {
        set({ isLoading: true })
        try {
            const response = await axiosInstance.get('/admin/checkAdmin')
            console.log("response", response.data)
            set({ isAdmin: response.data.admin })
        } catch (errors: any) {
            set({ error: errors.message })
            console.log(errors)
        } finally {
            set({ isLoading: false })
        }
    },
    reset: () => {
        set({ isAdmin: false, error: null, isLoading: false })
    }
}))