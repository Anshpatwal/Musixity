import { usePlayerStore } from "@/store/usePlayerStore"
import { useEffect, useRef } from "react"

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const prevSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying, playNext } = usePlayerStore()

  //play the audio
  useEffect(() => {
    const audio = audioRef.current
    if (isPlaying) {
      audio?.play()
    } else {
      audio?.pause()
    }
  }, [isPlaying])

  //play next
  useEffect(() => {
    const audio = audioRef.current

    const handleNext = () => {
      playNext()
    }

    audio?.addEventListener('ended', handleNext)
    return () => audio?.addEventListener('ended', handleNext)
  }, [playNext])

  // change of song
  useEffect(() => {

    if (!audioRef.current || !currentSong) return

    const audio = audioRef.current

    const isSongChange = prevSongRef.current !== currentSong?.audioUrl

    if (isSongChange) {
      audio.src = currentSong?.audioUrl
      audio.currentTime = 0
      prevSongRef.current = currentSong?.audioUrl
    }
    if (isPlaying) audio.play()
  }, [currentSong, isPlaying])

  return <audio ref={audioRef} />

}

export default AudioPlayer
