"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, PauseCircle, Volume2, VolumeX, ListMusic, Mail, ChevronsRight, ChevronsLeft, Music, X, Radio } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { topCharts } from "@/lib/data";

const STREAM_URL = "https://stream.zeno.fm/cbzw2rbebfkuv";

export function RightSidebarPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const songImage = PlaceHolderImages.find(p => p.id === 'song-1');

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.load();
        audioRef.current.play().catch(e => console.error("Play error:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0) {
        setIsMuted(false);
    }
  };

  const toggleMute = () => {
      setIsMuted(!isMuted);
  }

  const recentTracks = topCharts.slice(1, 4);


  return (
    <>
      <audio ref={audioRef} src={STREAM_URL} preload="none" />
      <div 
        className="fixed top-0 h-full bg-card/95 backdrop-blur-md border-l border-border transition-all duration-300 z-50 flex flex-col"
        style={{ right: isOpen ? '0' : '-350px', width: '350px' }}
      >
        <Button 
            variant="primary" 
            size="icon" 
            className="absolute top-5 -left-12 rounded-r-none"
            onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? <X/> : <Radio />}
        </Button>
        
        {/* Top Image Section */}
        <div className="relative h-[40%] w-full">
            <div className="absolute inset-0">
                {songImage && (
                  <Image 
                      src={songImage.imageUrl}
                      alt="Album art background"
                      fill
                      className="object-cover blur-2xl opacity-30"
                      data-ai-hint="abstract crimson"
                  />
                )}
            </div>
            <div className="relative z-10 flex flex-col items-center justify-end h-full p-8 text-center">
                 <p className="font-headline text-lg uppercase tracking-wider">Tocando Agora</p>
                 <div className="relative w-48 h-48 mt-4 rounded-lg overflow-hidden shadow-2xl">
                     {songImage && (
                       <Image 
                           src={songImage.imageUrl}
                           alt="Album art"
                           fill
                           className="object-cover"
                           data-ai-hint="abstract crimson"
                       />
                     )}
                 </div>
                 <div className="mt-4">
                     <h2 className="text-2xl font-bold">{topCharts[0].title}</h2>
                     <p className="text-muted-foreground">{topCharts[0].artist}</p>
                 </div>
            </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center justify-center -mt-10 z-20">
             <Button variant="ghost" size="icon" onClick={togglePlay} className="rounded-full h-20 w-20 bg-card hover:bg-card">
                {isPlaying ? <PauseCircle className="h-16 w-16 text-primary" /> : <PlayCircle className="h-16 w-16 text-primary" />}
            </Button>
            <div className="flex items-center gap-4 w-full max-w-[250px] mt-4">
                <Button variant="ghost" size="icon" onClick={toggleMute}>
                   {isMuted || volume === 0 ? <VolumeX /> : <Volume2 />}
                </Button>
                <Slider
                    value={[isMuted ? 0 : volume]}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                />
            </div>
        </div>

        {/* Recent Tracks */}
        <div className="flex-grow flex flex-col p-6 overflow-hidden">
            <h3 className="font-headline text-lg uppercase tracking-wider text-center my-4">Músicas recentes</h3>
            <div className="flex-grow overflow-y-auto pr-2 space-y-3">
                {recentTracks.map(track => (
                    <div key={track.rank} className="flex items-center gap-4 bg-muted/50 p-2 rounded-md">
                        <div className="w-12 h-12 rounded-md bg-primary flex items-center justify-center font-bold text-primary-foreground">
                            <Music/>
                        </div>
                        <div>
                            <p className="font-semibold leading-tight">{track.title}</p>
                            <p className="text-sm text-muted-foreground">{track.artist}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Bottom Links */}
        <div className="p-6 border-t">
            <div className="flex justify-around items-center">
                <Button variant="ghost" className="flex flex-col h-auto" asChild>
                    <Link href="/requests">
                        <Mail />
                        <span>Peça sua música</span>
                    </Link>
                </Button>
                 <Button variant="ghost" className="flex flex-col h-auto" asChild>
                    <Link href="/charts">
                        <ListMusic />
                        <span>Top 10</span>
                    </Link>
                </Button>
            </div>
        </div>

      </div>
    </>
  );
}
