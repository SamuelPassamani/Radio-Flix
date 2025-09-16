"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

const STREAM_URL = "https://cast2.hoost.com.br:20000/stream";

export function LivePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

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

  return (
    <div className="flex items-center">
      <audio ref={audioRef} src={STREAM_URL} preload="none" />
      <Button variant="default" size="icon" onClick={togglePlay} className="rounded-full h-12 w-12">
        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
      </Button>
    </div>
  );
}
