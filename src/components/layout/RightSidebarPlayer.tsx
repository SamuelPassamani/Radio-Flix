'use client';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import Image from "next/image";
import { parseTrackTitle } from "@/lib/utils";

// Hoost Player Configuration
const STREAM_URL = 'https://stream.zeno.fm/ghc9z2e2pg0uv';
const STATS_URL = 'https://proxy.zeno.fm/proxy/nowplaying/ghc9z2e2pg0uv?type=json';

// Function to fetch statistics
const fetchStats = async () => {
  try {
    const response = await fetch(STATS_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return {
      song: data.now_playing?.song || 'Rádio Conectar',
      cover: data.now_playing?.art || '/images/banners/banner-app.png'
    };
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return {
      song: 'Rádio Conectar',
      cover: '/images/banners/banner-app.png'
    };
  }
};

export function RightSidebarPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSong, setCurrentSong] = useState('Carregando...');
  const [currentCover, setCurrentCover] = useState('/images/banners/banner-app.png');
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const updateStats = async () => {
      const { song, cover } = await fetchStats();
      setCurrentSong(song);
      setCurrentCover(cover);
    };

    updateStats();
    const interval = setInterval(updateStats, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.src = STREAM_URL;
        audioRef.current.play().catch(error => console.error("Play failed:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const { title, artist } = parseTrackTitle(currentSong);

  return (
    <aside className="fixed top-16 right-0 w-80 h-[calc(100vh-4rem)] bg-card border-l border-border p-6 flex flex-col justify-between z-40">
       <div>
        <h2 className="font-headline text-2xl font-bold mb-6 text-center tracking-wider">TOCANDO AGORA</h2>
        
        {/* Player Content - Recreating the reference style */}
        <div className="flex flex-col items-center justify-start pt-8 gap-3">

          {/* Album Art & Vinyl Container */}
          <div className="relative w-[240px] h-[240px] mb-8 flex items-center justify-center">
            
            {/* Album Art (Square, on top) */}
            <div className="absolute left-1/2 top-[15px] -translate-x-1/2 w-[210px] h-[210px] shadow-lg z-10">
              <Image 
                src={currentCover}
                alt={`Capa do álbum ${title}`}
                fill
                sizes="210px"
                className="object-cover bg-panel-contrast rounded-md"
              />
            </div>

            {/* Spinning Vinyl (Slightly below album art) */}
            <div className="absolute left-1/2 bottom-[-32px] -translate-x-1/2 w-[180px] h-[180px] z-0">
              <Image 
                src="/images/player/vinil.svg"
                alt="Vinil girando"
                fill
                sizes="180px"
                className={`animate-spin-slow ${!isPlaying ? '[animation-play-state:paused]' : '[animation-play-state:running]'}`} 
              />
            </div>
          </div>

          {/* Song Info - Adjusted styles to match the reference */}
          <div className="w-full max-w-[90%] text-center mt-8">
            <h3 className="font-headline text-2xl font-extrabold uppercase text-white truncate">{title}</h3>
            {artist && <p className="font-sans text-base text-muted-foreground truncate">{artist}</p>}
          </div>
        </div>
       </div>

      {/* Player Controls (Unchanged) */}
      <div className="mt-auto">
        <Separator className="my-4" />
        <div className="flex items-center justify-around">
          <Button variant="ghost" size="icon" onClick={toggleMute}>
            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </Button>
          <Button size="icon" className="w-16 h-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={togglePlayPause}>
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 pl-1" />}
          </Button>
           <Button variant="ghost" size="icon">
            <Maximize2 className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <audio ref={audioRef} preload="none" />
    </aside>
  );
}
