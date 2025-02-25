import AlbumTabsContent from "@/components/AlbumTabsContent"
import DashBoardStats from "@/components/DashBoardStats"
import Header from "@/components/Header"
import SongsTabsContent from "@/components/SongsTabsContent"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthStore } from "@/store/useAuthStore"
import { useMusicStore } from "@/store/useMusicStore"
import { Album, Music } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AdminPage = () => {
    const { isAdmin, isLoading } = useAuthStore()
    const navigate = useNavigate()
    const { fetchAllSongs, fetchAlbums, fetchStats } = useMusicStore()


    if (!isLoading && !isAdmin) {
        navigate('/')
    }


    useEffect(() => {
        fetchAlbums()
        fetchAllSongs()
        fetchStats()
    }, [fetchAlbums, fetchAllSongs, fetchStats])

    return (
        <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900
        to-black text-zinc-100 p-8'>
            <Header />
            <DashBoardStats />
            <Tabs defaultValue="songs" className='space-y-6'>
                <TabsList className='p-1 bg-zinc-800/50'>
                    <TabsTrigger value='songs' className='data-[state=active]:bg-zinc-700'>
                        <Music className='mr-2 size-4' />
                        Songs
                    </TabsTrigger>
                    <TabsTrigger value='albums' className='data-[state=active]:bg-zinc-700'>
                        <Album className='mr-2 size-4' />
                        Albums
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="songs">
                    <SongsTabsContent />
                </TabsContent>
                <TabsContent value="albums">
                    <AlbumTabsContent />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default AdminPage
