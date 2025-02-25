import { useAuth } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../lib/axios'
import { Loader } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { useChatStore } from '@/store/useChatStore'

const updateApiToken = (token: string | null) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axiosInstance.defaults.headers.common['Authorization']
    }
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { getToken, userId } = useAuth()
    const { checkAdminStatus } = useAuthStore()
    const [loading, setLoading] = useState(true)
    const { initSocket, disconnectSocket } = useChatStore()

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken()
                updateApiToken(token)
                if (token) {
                    await checkAdminStatus()
                    if (userId) initSocket(userId)
                }
            } catch (error) {
                updateApiToken(null)
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        initAuth()

        return () => disconnectSocket()
    }, [getToken, userId, initSocket, checkAdminStatus, disconnectSocket])


    if (loading) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <Loader className='size-8 text-emerald-500 animate-spin' />
        </div>
    }
    return (
        <>
            {children}
        </>
    )
}

export default AuthProvider
