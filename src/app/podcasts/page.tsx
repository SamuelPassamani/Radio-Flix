"use client"
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { podcasts } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Mic, PlayCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PodcastsPage() {
  const { toast } = useToast();
  const [playingPodcast, setPlayingPodcast] = useState<number | null>(null);

  const handlePlay = (podcastId: number, podcastTitle: string) => {
    if (playingPodcast === podcastId) {
      setPlayingPodcast(null); // Stop playing
    } else {
      setPlayingPodcast(podcastId);
      toast({
        title: "Now Playing",
        description: podcastTitle,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <Mic className="h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Podcasts</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Catch up on our latest shows and exclusive interviews.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {podcasts.map((podcast) => {
          const podcastImage = PlaceHolderImages.find(p => p.id === podcast.imageId);
          const isPlaying = playingPodcast === podcast.id;
          return (
            <Card key={podcast.id} className="overflow-hidden flex flex-col group">
              {podcastImage && (
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={podcastImage.imageUrl}
                    alt={podcast.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={podcastImage.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                     <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-20 w-20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 scale-100 group-hover:scale-110"
                        onClick={() => handlePlay(podcast.id, podcast.title)}
                     >
                        <PlayCircle size={60} />
                     </Button>
                  </div>
                </div>
              )}
              <CardHeader className="flex-grow">
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">{podcast.title}</CardTitle>
                <CardDescription>{podcast.host} - {podcast.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm line-clamp-3">{podcast.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
