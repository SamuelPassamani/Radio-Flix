"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, PauseCircle, Volume2, VolumeX, ListMusic, Mail, Music, X, Radio } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import Link from "next/link";

// URLs e constantes da API
const STREAM_URL = "https://stream.zeno.fm/cbzw2rbebfkuv";
const API_URL = `https://twj.es/free/?url=${STREAM_URL}`;
const FALLBACK_API_URL = `https://twj.es/metadata/?url=${STREAM_URL}`;
const DEFAULT_COVER_ART = "/img/cover.png"; // Usando uma imagem padrão local

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

// Cache simples para a API do iTunes
const cache: { [key: string]: any } = {};

// Função para buscar dados da API do iTunes com cache
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

  // Retorno padrão em caso de falha ou nenhum resultado
  return { art: DEFAULT_COVER_ART, cover: DEFAULT_COVER_ART };
};


export function RightSidebarPlayer() {
  const [isPlaying, setIsPlaying] = useState(true); // Inicia como true para autoplay
  const [volume, setVolume] = useState(80);
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

  // Efeito para buscar os dados da música periodicamente
  useEffect(() => {
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
          
          setSongData({
            title: songTitle,
            artist: artistName,
            albumArtUrl: art,
            bgImageUrl: cover,
          });

          // Atualiza o histórico
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

  // Efeito para controlar o volume do áudio
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
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={STREAM_URL} 
        preload="auto" 
        autoPlay
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

        {/* Seção da Imagem Superior com Fundo Desfocado */}
        <div className="relative h-[45%] w-full flex-shrink-0">
          <div className="absolute inset-0">
            <Image
              src={songData.bgImageUrl}
              alt="Fundo da capa do álbum"
              fill
              className="object-cover blur-2xl opacity-30"
              unoptimized
            />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-end h-full p-4 text-center">
            <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-2xl transition-all duration-500 ease-in-out">
              <Image
                src={songData.albumArtUrl}
                alt="Capa do álbum"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="mt-4 w-full">
              <h2 className="text-2xl font-bold truncate" title={songData.title}>{songData.title}</h2>
              <p className="text-muted-foreground truncate" title={songData.artist}>{songData.artist}</p>
            </div>
          </div>
        </div>

        {/* Controles do Player */}
        <div className="flex flex-col items-center justify-center -mt-8 z-20 flex-shrink-0">
          <Button variant="ghost" size="icon" onClick={togglePlay} className="rounded-full h-16 w-16 bg-card/80 hover:bg-card/90 backdrop-blur-sm">
            {isPlaying ? <PauseCircle className="h-14 w-14 text-primary" /> : <PlayCircle className="h-14 w-14 text-primary" />}
          </Button>
          <div className="flex items-center gap-2 w-full max-w-[220px] mt-2">
            <Button variant="ghost" size="icon" onClick={toggleMute}>
              {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
            />
          </div>
           <span className="text-xs text-muted-foreground mt-1">Volume {isMuted ? 0 : volume}%</span>
        </div>

        {/* Histórico de Músicas */}
        <div className="flex-grow flex flex-col p-4 pt-2 overflow-hidden">
          <h3 className="font-headline text-md uppercase tracking-wider text-center my-4 flex-shrink-0">Histórico</h3>
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

        {/* Links Inferiores */}
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
