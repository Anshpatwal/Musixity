import AudioPlayer from "@/components/AudioPlayer"
import LeftSIdeBar from "@/components/LeftSIdeBar"
import PlayBackControls from "@/components/PlayBackControls"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import UserActivity from "@/components/UserActivity"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"


const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false)


  useEffect(() => {
    const checkMobileWidth = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobileWidth()
    window.addEventListener('resize', checkMobileWidth)

    return () => window.removeEventListener('resize', checkMobileWidth)
  }, [])

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* left side bar */}
      <AudioPlayer />
      <ResizablePanelGroup direction="horizontal" className="flex flex-1 h-full overflow-hidden p-2">
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
          <LeftSIdeBar />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
        {/* Main Panel */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60} >
          <Outlet />
        </ResizablePanel>

        {!isMobile && (
          <>
            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
            {/* Right Size  */}
            <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0} >
              <UserActivity />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
      <PlayBackControls />
    </div>
  )
}

export default MainLayout
