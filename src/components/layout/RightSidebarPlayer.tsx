"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, ListMusic, Mail, Music, X, Radio } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// URLs e constantes da API
const STREAM_URL = "https://stream.zeno.fm/cbzw2rbebfkuv";
const API_URL = `https://twj.es/free/?url=${STREAM_URL}`;
const FALLBACK_API_URL = `https://twj.es/metadata/?url=${STREAM_URL}`;
const DEFAULT_COVER_ART = "/img/cover.png";

interface SongData {
  title: string;
  artist: string;
  albumArtUrl: string;
  bgImageUrl: string;
}

interface HistoryItem {
  song: string;
  artist: string;
  albumArtUrl: string;
}

const cache: { [key: string]: any } = {};

const getDataFromITunes = async (artist: string, title: string): Promise<{ art: string; cover: string }> => {
  const text = `${artist} - ${title}`;
  const cacheKey = text.toLowerCase();
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  try {
    const response = await fetch(`https://itunes.apple.com/search?limit=1&term=${encodeURIComponent(text)}`);
    if (!response.ok) {
      throw new Error("iTunes API request failed");
    }
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const itunes = data.results[0];
      const results = {
        art: itunes.artworkUrl100 ? itunes.artworkUrl100.replace("100x100", "600x600") : DEFAULT_COVER_ART,
        cover: itunes.artworkUrl100 ? itunes.artworkUrl100.replace("100x100", "1500x1500") : DEFAULT_COVER_ART,
      };
      cache[cacheKey] = results;
      return results;
    }
  } catch (error) {
    console.error("Error fetching from iTunes API:", error);
  }

  return { art: DEFAULT_COVER_ART, cover: DEFAULT_COVER_ART };
};

export function RightSidebarPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [songData, setSongData] = useState<SongData>({
    title: "Carregando...",
    artist: "Rádio Flix",
    albumArtUrl: DEFAULT_COVER_ART,
    bgImageUrl: DEFAULT_COVER_ART,
  });
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentSongTitleRef = useRef<string | null>(null);

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.play().catch(e => console.error("Autoplay was prevented:", e));
    }
    
    const fetchStreamingData = async (url: string): Promise<any> => {
      try {
        const response = await fetch(url);
        if (!response.ok) return null;
        return await response.json();
      } catch (error) {
        console.error(`Error fetching streaming data from ${url}:`, error);
        return null;
      }
    };

    const updateSongData = async () => {
      let data = await fetchStreamingData(API_URL) || await fetchStreamingData(FALLBACK_API_URL);
      if (data) {
        const songTitle = data.songtitle || (typeof data.song === "object" ? data.song.title : data.song) || "Música Desconhecida";
        const artistName = (typeof data.artist === "object" ? data.artist.title : data.artist) || "Artista Desconhecido";
        if (songTitle !== currentSongTitleRef.current) {
          currentSongTitleRef.current = songTitle;
          const { art, cover } = await getDataFromITunes(artistName, songTitle);
          setSongData({ title: songTitle, artist: artistName, albumArtUrl: art, bgImageUrl: cover });
          const historyArray: any[] = data.song_history || data.history || [];
          const formattedHistory = await Promise.all(
            historyArray.slice(0, 4).map(async (item: any) => {
              const histSong = item.song?.title || item.song || "N/A";
              const histArtist = item.song?.artist || item.artist || "N/A";
              const { art: histArt } = await getDataFromITunes(histArtist, histSong);
              return { song: histSong, artist: histArtist, albumArtUrl: histArt };
            })
          );
          setHistory(formattedHistory);
        }
      }
    };
    updateSongData();
    const interval = setInterval(updateSongData, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.load();
        audioRef.current.play().catch(e => console.error("Play error:", e));
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0) setIsMuted(false);
  };

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <>
      <audio 
        ref={audioRef} 
        src={STREAM_URL} 
        preload="auto" 
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div
        className="fixed top-0 h-full bg-card/95 backdrop-blur-md border-l border-border transition-all duration-300 z-50 flex flex-col"
        style={{ right: isOpen ? "0" : "-350px", width: "350px" }}
      >
        <Button
          size="icon"
          className="absolute top-5 -left-12 rounded-r-none rounded-l-md h-10 w-10 bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/80"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Radio className="h-6 w-6" />}
        </Button>

        <div className="relative flex-shrink-0 flex flex-col items-center justify-center p-8 space-y-4">
          <div className="relative w-48 h-48 group rounded-full overflow-hidden shadow-2xl">
            <Image
              src={songData.albumArtUrl}
              alt="Capa do álbum"
              fill
              className={cn(
                "object-cover",
                isPlaying && "animate-spin-slow"
              )}
              unoptimized
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={togglePlay} 
              className="absolute inset-0 m-auto h-16 w-16 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm hover:bg-black/60"
            >
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
            </Button>
          </div>

          <div className="text-center w-full">
            <h2 className="text-2xl font-bold truncate" title={songData.title}>{songData.title}</h2>
            <p className="text-muted-foreground truncate" title={songData.artist}>{songData.artist}</p>
          </div>

          <div className="w-full max-w-[250px] space-y-2">
             <div className="flex items-center gap-2 w-full">
              <Button variant="ghost" size="icon" onClick={toggleMute} className="h-8 w-8">
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
              />
            </div>
            <span className="text-center block text-xs text-muted-foreground">Volume {isMuted ? 0 : volume}%</span>
          </div>
        </div>

        <div className="flex-grow flex flex-col p-4 pt-2 overflow-hidden">
          <h3 className="font-headline text-md uppercase tracking-wider text-center my-2 flex-shrink-0">Histórico</h3>
          <div className="flex-grow overflow-y-auto pr-2 space-y-3">
            {history.length > 0 ? history.map((track, index) => (
              <div key={index} className="flex items-center gap-3 bg-muted/40 p-2 rounded-md hover:bg-muted/80 transition-colors">
                <div className="w-12 h-12 rounded-md overflow-hidden relative flex-shrink-0">
                  <Image src={track.albumArtUrl} alt={`Capa de ${track.song}`} fill className="object-cover" unoptimized/>
                </div>
                <div className="overflow-hidden">
                  <p className="font-semibold leading-tight truncate">{track.song}</p>
                  <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                </div>
              </div>
            )) : (
              <p className="text-center text-muted-foreground text-sm">Histórico indisponível.</p>
            )}
          </div>
        </div>

        <div className="p-4 border-t flex-shrink-0">
          <div className="flex justify-around items-center">
            <Button variant="ghost" className="flex flex-col h-auto" asChild>
              <Link href="/requests">
                <Mail />
                <span className="mt-1 text-xs">Peça sua música</span>
              </Link>
            </Button>
            <Button variant="ghost" className="flex flex-col h-auto" asChild>
              <Link href="/charts">
                <ListMusic />
                <span className="mt-1 text-xs">Top Músicas</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
