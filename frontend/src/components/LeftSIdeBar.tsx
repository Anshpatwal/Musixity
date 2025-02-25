import { cn } from "@/lib/utils"
import { HomeIcon, Library, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { buttonVariants } from "./ui/button"
import { SignedIn } from "@clerk/clerk-react"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import PlaylistSkeleton from "./skeletons/PlayListSkeleton"
import { useMusicStore } from "@/store/useMusicStore"
import { useEffect } from "react"


const LeftSIdeBar = () => {
    const { isLoading, albums, fetchAlbums } = useMusicStore()

    useEffect(() => {
        fetchAlbums()
    }, [fetchAlbums])

    return (
        <div className="h-full flex flex-col gap-2">

            {/* Navigation Menu  */}

            <div className="rounded-lg bg-zinc-900 p-4">
                <div className="space-y-2">
                    <Link to='/' className={cn(buttonVariants({
                        variant: 'ghost',
                        className: 'w-full justify-start text-white hover:bg-zinc-800',
                    }))}>
                        <HomeIcon className="mr-2" size={10} />
                        <span className="hidden md:inline text-xl">Home</span>
                    </Link>
                    <SignedIn>
                        <Link to='/chat' className={cn(buttonVariants({
                            variant: 'ghost',
                            className: 'w-full justify-start text-white hover:bg-zinc-800',
                        }))}>
                            <MessageCircle className="mr-2 " size={7} />
                            <span className="hidden md:inline text-xl">Chat</span>
                        </Link>
                    </SignedIn>
                </div>
            </div>

            {/* Library  */}
            <div className="flex-1 rounded-lg bg-zinc-900 p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-white px-2">
                        <Library className="size-7 mr-2" />
                        <span className="hidden:md-inline text-xl">Playlists</span>
                    </div>
                </div>

                <ScrollArea className="h-[clac(100vh-300px)]">
                    <div className="space-y-2">
                        {isLoading ? (<PlaylistSkeleton />) : (
                            <div>
                                {albums.map((album,index) => {
                                    return <div  key={index}>
                                        <Link  to={`/albums/${album._id}`}  className="p-2 hover::bg-zinc-800 rounded-md flex items-center gap-3 cursor-pointer">
                                            <img src={album.imageUrl} alt="Playlist-Image" className="size-12 rounded-md flex-shrink-0 object-cover" />
                                            <div className="flex-1 min-w-0 hidden md:block">
                                                <p className="font-medium truncate">{album.title}</p>
                                                <p className="text-sm text-zinc-400 truncate">{album.artist}</p>
                                            </div>
                                        </Link>
                                    </div>
                                })}
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div >

        </div >
    )
}

export default LeftSIdeBar
