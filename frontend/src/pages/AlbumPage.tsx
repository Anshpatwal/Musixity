import { Button } from "@/components/ui/button"
import { useMusicStore } from "@/store/useMusicStore"
import { usePlayerStore } from "@/store/usePlayerStore"
import { song } from "@/types"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Clock, Pause, Play } from "lucide-react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const AlbumPage = () => {
    const params = useParams()
    const { isLoading, fetchAlbumById, currentAlbum } = useMusicStore()
    const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore()

    const playAlbumSongs = () => {
        if (!currentAlbum) return
        const isCurrentAlbumPlaying = currentAlbum?.songs.some((song: any) => song._id === currentSong?._id)

        if (isCurrentAlbumPlaying) {
            togglePlay()
        } else {
            playAlbum(currentAlbum?.songs, 0)
        }
    }

    const handlePlayAlbum = (index: number) => {
        if (!currentAlbum) return
        playAlbum(currentAlbum?.songs, index)
    }

    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        if (params.albumId) fetchAlbumById(params.albumId)
    }, [fetchAlbumById, params.albumId])

    if (isLoading) {
        return null
    }

    return (
        <div className="h-full">
            <ScrollArea className="h-full rounded-md">
                <div className="relative min-h-full">
                    <div
                        className='absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
					 to-zinc-900 pointer-events-none'
                        aria-hidden='true'
                    />

                    {/* Content  */}

                    <div className="relative z-10">
                        <div className="flex p-6 gap-6 pb-8">
                            <img
                                src={currentAlbum?.imageUrl}
                                alt={currentAlbum?.title}
                                className='w-[240px] h-[240px] shadow-xl rounded'
                            />
                            <div className='flex flex-col justify-end'>
                                <p className='text-sm font-medium'>Album</p>
                                <h1 className='text-7xl font-bold my-4'>{currentAlbum?.title}</h1>
                                <div className='flex items-center gap-2 text-sm text-zinc-100'>
                                    <span className='font-medium text-white'>{currentAlbum?.artist}</span>
                                    <span>• {currentAlbum?.songs.length} songs</span>
                                </div>
                            </div>
                        </div>

                        {/* play button */}
                        <div className='px-6 pb-4 flex items-center gap-6'>
                            <Button
                                onClick={playAlbumSongs}
                                size='icon'
                                className='w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all'>
                                {
                                    isPlaying && currentAlbum?.songs.some((song: any) => song._id === currentSong?._id) ? (
                                        <Pause className="h-7 w-7 text-black" />
                                    ) : (
                                        <Play className="h-7 w-7 text-black" />
                                    )
                                }
                            </Button>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className='bg-black/20 backdrop-blur-sm'>
                        {/* table header */}
                        <div
                            className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm  text-zinc-400 border-b border-white/5'>
                            <div>#</div>
                            <div>Title</div>
                            <div>Released Date</div>
                            <div>
                                <Clock className='h-4 w-4' />
                            </div>
                        </div>
                    </div>

                    {/* songs */}

                    <div className="px-6">
                        <div className="space-y-2 py-4">
                            {currentAlbum?.songs.map((song: song, index: number) => {
                                const isCurrentSong = currentSong?._id == song._id
                                return (
                                    <div
                                        key={index}
                                        onClick={() => handlePlayAlbum(index)}
                                        className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-100 hover:bg-white/10 rounded-md group cursor-pointer hover:scale-105 transition-all duration-200">

                                        <div className="flex items-center justify-center">
                                            {
                                                isCurrentSong && isPlaying ? (
                                                    <div className="size-4 text-green-500">♫</div>
                                                ) : (
                                                    <span className="group-hover:hidden">{index + 1}</span>
                                                )
                                            }
                                            {!isCurrentSong && (
                                                <Play className="h-4 w-4 hidden group-hover:block" />
                                            )}
                                        </div>

                                        <div className='flex items-center'>
                                            <img src={song.imageUrl} alt={song.title} className="size-10 rounded-md" />
                                            <div className="ml-3">
                                                <div className='font-medium text-white'>{song.title}</div>
                                                <div className="text-zinc-400 text-xs">{song.artist}</div>
                                            </div>
                                        </div>

                                        <div className='flex items-center'>{song.createdAt?.split("T")[0]}</div>
                                        <div className='flex items-center'>{formatDuration(song.duration)}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>





                </div>
            </ScrollArea >
        </div >
    )
}

export default AlbumPage
