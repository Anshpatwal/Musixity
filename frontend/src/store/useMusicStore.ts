import { axiosInstance } from '@/lib/axios';
import { album, song, stats } from '@/types';
import { toast } from "sonner"
import { create } from 'zustand'

interface MusicStore {
    songs: song[],
    albums: album[],
    isLoading: boolean,
    error: string | null,
    currentAlbum: null | album,
    madeForYouSongs: any,
    featuredSongs: any,
    trendingSongs: any,
    stats: stats,
    fetchAlbums: () => Promise<void>,
    fetchAlbumById: (id: string) => Promise<void>,
    fetchMadeForYouSongs: () => Promise<void>,
    fetchFeaturedSongs: () => Promise<void>,
    fetchTrendingSongs: () => Promise<void>,
    fetchAllSongs: () => Promise<void>,
    fetchStats: () => Promise<void>,
    deleteSongs: (is: string) => Promise<void>,
    deleteAlbums: (is: string) => Promise<void>
}

export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    isLoading: true,
    error: null,
    currentAlbum: null,
    madeForYouSongs: [],
    trendingSongs: [],
    featuredSongs: [],
    stats: {
        totalAlbums: 0,
        totalArtist: 0,
        totalSongs: 0,
        totalUser: 0
    },
    fetchFeaturedSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/song/featured');
            set({ featuredSongs: response.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Something went wrong" });
        } finally {
            set({ isLoading: false });
        }
    },
    fetchMadeForYouSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/song/madeforYou');
            set({ madeForYouSongs: response.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Something went wrong" });
        } finally {
            set({ isLoading: false });
        }
    },
    fetchTrendingSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/song/trending');
            set({ trendingSongs: response.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Something went wrong" });
        } finally {
            set({ isLoading: false });
        }
    },


    fetchAlbums: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/album');
            set({ albums: Array.isArray(response.data) ? response.data : [] });
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Something went wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchAlbumById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/album/${id}`);
            set({ currentAlbum: response.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Something went wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchAllSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/song')
            set({ songs: response.data })
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Something went wrong" });
        } finally {
            set({ isLoading: false });
        }
    },


    fetchStats: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/stats')
            set({ stats: response.data })
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Something went wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    deleteSongs: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/admin/songs/${id}`)
            set(state => ({
                songs: state.songs.filter(song => song._id != id)
            }))
            toast("Song Deleted Successfully")
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Something went wrong" });
        } finally {
            set({ isLoading: false });
        }
    },
    deleteAlbums: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/admin/albums/${id}`)
            set((state) => ({
                albums: state.albums.filter((album) => album._id != id),
                songs: state.songs.map((song) => song.albumId === state.albums.find(a => a._id === id)?.title ? { ...song, album: null } : song)
            }))
            toast("Album Deleted Successfully")
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Something went wrong" });
        } finally {
            set({ isLoading: false });
        }
    }

}));
