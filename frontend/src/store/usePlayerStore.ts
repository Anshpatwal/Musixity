import { song } from "@/types";
import { create } from "zustand";
import { useChatStore } from "./useChatStore";

interface PlayerStore {
    currentSong: null | song,
    isPlaying: boolean,
    queue: song[],
    currentIndex: number,
    initializeQueue: (song: song[]) => void,
    playAlbum: (songs: song[], startIndex?: number) => void,
    setCurrentSong: (song: song | null) => void,
    togglePlay: () => void,
    playNext: () => void,
    playPrevious: () => void
}

export const usePlayerStore = create<PlayerStore>((set, get: any) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,

    //set songs in the queue

    initializeQueue: (song: song[]) => {
        set({
            queue: song,
            currentSong: get().currentSong || song[0],
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex
        })

    },

    //set songs in the album
    playAlbum: (songs: song[], startIndex = 0) => {
        if (songs.length === 0) {
            return false
        }

        const song = songs[startIndex]

        const socket = useChatStore.getState().socket;
        if (socket.auth) {
            socket.emit("update_activity", {
                userId: socket.auth.userId,
                activity: `Playing ${song.title} by ${song.artist}`
            })
        }

        set({
            queue: songs,
            currentSong: song,
            currentIndex: startIndex,
            isPlaying: true,
        })
    },


    setCurrentSong: (song: song | null) => {
        if (!song) {
            return false
        }
        const songIndex = get().queue.findIndex((s: any) => s._id === song._id)

        const socket = useChatStore.getState().socket;
        if (socket.auth) {
            socket.emit("update_activity", {
                userId: socket.auth.userId,
                activity: `Playing ${song.title} by ${song.artist}`
            })
        }

        set({
            currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
            currentSong: song,
            isPlaying: true
        })
    },
    togglePlay: () => {
        const willStartPlaying = !get().isPlaying
        const currentSong = get().currentSong
        const socket = useChatStore.getState().socket;
        if (socket.auth) {
            socket.emit("update_activity", {
                userId: socket.auth.userId,
                activity: willStartPlaying && currentSong ? `Playing ${currentSong.title} by ${currentSong.artist}` : "Idle"
            })
        }
        set({
            isPlaying: willStartPlaying
        })
    },
    playNext: () => {
        const { currentIndex, queue } = get()
        const nextIndex = currentIndex + 1


        if (nextIndex < queue.length) {
            const nextSong = queue[nextIndex]
            const socket = useChatStore.getState().socket;
            if (socket.auth) {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Playing ${nextSong.title} by ${nextSong.artist}`
                })
            }
            set({
                currentSong: nextSong,
                currentIndex: nextIndex,
                isPlaying: true
            })
        } else {
            set({
                isPlaying: false
            })
        }
    },
    playPrevious: () => {
        const { currentIndex, queue } = get()
        const previousIndex = currentIndex - 1

        if (previousIndex >= 0) {
            const previousSong = queue[previousIndex]

            const socket = useChatStore.getState().socket;
            if (socket.auth) {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Playing ${previousSong.title} by ${previousSong.artist}`
                })
            }

            set({
                currentSong: previousSong,
                currentIndex: previousIndex,
                isPlaying: true
            })
        } else {
            set({ isPlaying: false })
            const socket = useChatStore.getState().socket;
            if (socket.auth) {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: "Idle"
                })
            }
        }
    }
}))