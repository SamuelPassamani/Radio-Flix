// This component is not currently used in the layout.
// It is preserved here for potential future use.
// To enable it, add it to `src/app/layout.tsx`.

'use client';

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState, useRef } from "react";
import { Play, Pause, Volume1, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { parseTrackTitle } from "@/lib/utils";

// This is a placeholder stream URL. Replace with your actual stream.
const STREAM_URL = "https://stream.zeno.fm/fvrx194p2p8uv";

// This is a placeholder for stream metadata.
// In a real app, you would fetch this from your streaming provider's API.
const getStreamInfo = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  const nowPlaying = [
    "Crimson Waves - The Red Tides",
    "Midnight Drive - Neon Dreams",
    "Echoes in the Rain - Lost Frequencies"
  ];
  return {
    nowPlaying: nowPlaying[Math.floor(Math.random() * nowPlaying.length)]
  }
}


export function RightSidebarPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("Loading...");

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Update track info periodically
    const fetchTrackInfo = async () => {
      try {
        const info = await getStreamInfo();
        setCurrentTrack(info.nowPlaying);
      } catch (error) {
        console.error("Failed to fetch track info", error);
        setCurrentTrack("Radio Offline");
      }
    };

    fetchTrackInfo();
    const interval = setInterval(fetchTrackInfo, 15000); // every 15s

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = volume;
        if(volume > 0) setIsMuted(false);
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.src = STREAM_URL;
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
        if(!isMuted && volume === 0) setVolume(0.5);
    }
  }

  const { title, artist } = parseTrackTitle(currentTrack);
  const coverImage = PlaceHolderImages.find(p => p.id === 'song-1'); // Placeholder

  return (
    <aside className="fixed top-14 right-0 w-80 h-[calc(100vh-3.5rem)] bg-card border-l border-border p-6 flex flex-col justify-between">
      <div>
        <h2 className="font-headline text-2xl font-bold mb-4">Live Player</h2>
        
        <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg mb-4">
            {coverImage && (
                <Image 
                    src={coverImage.imageUrl}
                    alt={`Cover for ${title}`}
                    fill
                    sizes="320px"
                    className="object-cover"
                    data-ai-hint={coverImage.imageHint}
                />
            )}
             <div 
                className={`absolute inset-0 bg-black/70 flex items-center justify-center transition-opacity duration-500 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
             >
                <Button 
                    size="icon"
                    className="w-20 h-20 rounded-full bg-primary/80 text-primary-foreground hover:bg-primary"
                    onClick={togglePlayPause}
                >
                    {isPlaying ? <Pause className="h-10 w-10" /> : <Play className="h-10 w-10 pl-1" />}
                </Button>
            </div>
        </div>

        <div>
            <p className="text-xl font-bold truncate">{title}</p>
            <p className="text-muted-foreground truncate">{artist}</p>
        </div>
      </div>
      
      <div>
        <Separator className="my-4" />
        <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" onClick={toggleMute}>
                {isMuted || volume === 0 ? <VolumeX className="h-6 w-6" /> : (volume < 0.5 ? <Volume1 className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />)}
            </Button>
            <Slider 
                value={[isMuted ? 0 : volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={1}
                step={0.05}
            />
        </div>
      </div>

      <audio ref={audioRef} preload="none" />
    </aside>
  );
}
