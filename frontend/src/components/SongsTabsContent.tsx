import { Music } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import SongsTable from "./SongsTable"
import AddSongDialog from "./AddSongDialog"

const SongsTabsContent = () => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-3xl">
                            <Music className="size-7 text-emerald-500" />
                            Songs Library
                        </CardTitle>
                        <CardDescription className="text-xl">
                            Manage your music tracks
                        </CardDescription>
                    </div>
                    <AddSongDialog />
                </div>
            </CardHeader>
            <CardContent>
                <SongsTable />
            </CardContent>
        </Card>
    )
}

export default SongsTabsContent
