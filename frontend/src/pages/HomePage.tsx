import FeaturedSection from "@/components/FeaturedSection"
import SectionGrid from "@/components/SectionGrid"
import TopBar from "@/components/TopBar"
import { useMusicStore } from "@/store/useMusicStore"
import { usePlayerStore } from "@/store/usePlayerStore"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useEffect } from "react"

const HomePage = () => {

    const { fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, isLoading, madeForYouSongs, trendingSongs, error, featuredSongs } = useMusicStore()
    const { initializeQueue } = usePlayerStore()

    useEffect(() => {
        fetchFeaturedSongs()
        fetchMadeForYouSongs()
        fetchTrendingSongs()
    }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs])

    useEffect(() => {
        if (featuredSongs.length > 0 && madeForYouSongs.length > 0 && trendingSongs.length > 0) {
            const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs]
            initializeQueue(allSongs)
        }
    }, [featuredSongs, madeForYouSongs, trendingSongs,initializeQueue])

    return (
        <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
            <TopBar />
            <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="p-4 sm:p-6">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good AfterNoon</h1>
                    <FeaturedSection />
                    <div className="space-y-8">
                        <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading} error={error} />
                        <SectionGrid title="Trending Songs" songs={trendingSongs} isLoading={isLoading} error={error} />
                    </div>
                </div>
            </ScrollArea>
        </main>
    )
}

export default HomePage
