"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

const STREAM_URL = "https://cast2.hoost.com.br:20000/stream";

export function LivePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [isMuted, setIsMuted] = useState(false);
  const [barHeights, setBarHeights] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const newBars = Array.from({ length: 15 }, () => Math.random() * 80 + 20);
    setBarHeights(newBars);

    if (isPlaying) {
      const interval = setInterval(() => {
        const newBars = Array.from({ length: 15 }, () => Math.random() * 80 + 20);
        setBarHeights(newBars);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume[0] / 100;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.load(); // Important for some streaming sources
        audioRef.current.play().catch(e => console.error("Play error:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if(audioRef.current) {
      audioRef.current.muted = newMuted;
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    if (newVolume[0] === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  return (
    <div className="flex items-center gap-4 p-2 rounded-lg bg-card border w-full md:w-auto">
      <audio ref={audioRef} src={STREAM_URL} preload="none" />
      <Button variant="ghost" size="icon" onClick={togglePlay} className="flex-shrink-0">
        {isPlaying ? <Pause className="h-6 w-6 text-primary" /> : <Play className="h-6 w-6" />}
      </Button>
      <div className="flex flex-col flex-grow">
        <div className="flex items-center gap-2">
            <div className="relative flex items-center">
                <span className="relative flex h-3 w-3">
                    <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75", isPlaying ? "bg-primary" : "bg-muted-foreground")}></span>
                    <span className={cn("relative inline-flex rounded-full h-3 w-3", isPlaying ? "bg-primary" : "bg-muted-foreground")}></span>
                </span>
            </div>
            <span className="text-sm font-semibold uppercase tracking-wider">{isPlaying ? "Live" : "Offline"}</span>
        </div>
        <div className="flex items-center gap-1 h-6 w-20">
          {barHeights.map((height, index) => (
            <div
              key={index}
              className="w-1 bg-primary/50 transition-all duration-200"
              style={{ height: isPlaying ? `${height}%` : '10%' }}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 w-28">
        <Button variant="ghost" size="icon" onClick={toggleMute} className="flex-shrink-0">
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
        <Slider
          value={isMuted ? [0] : volume}
          onValueChange={handleVolumeChange}
          max={100}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );
}
