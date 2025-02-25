import { Library } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import AddAlbumDialog from "./AddAlbumDialog"
import AlbumsTable from "./AlbumsTable"

const AlbumTabsContent = () => {
  return (
    <>
      <Card className='bg-zinc-800/50 border-zinc-700/50'>
        <CardHeader>
          <div className='flex items-center justify-between '>
            <div>
              <CardTitle className='flex items-center gap-3 text-3xl'>
                <Library className=' text-violet-500 size-7' />
                Albums Library
              </CardTitle>
              <CardDescription className="text-xl">Manage your album collection</CardDescription>
            </div>
            <AddAlbumDialog />
          </div>
        </CardHeader>
        <CardContent>
          <AlbumsTable />
        </CardContent>
      </Card>
    </>
  )
}

export default AlbumTabsContent
