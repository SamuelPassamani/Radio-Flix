import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { news, schedule, topCharts } from "@/lib/data";
import { ArrowRight, Music, Calendar, Newspaper, Mic, Rss, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { podcasts } from "@/lib/data";

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-home');
  const latestNews = news.slice(0, 5);
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySchedule = schedule.find(day => day.day === today)?.shows || [];
  const latestPodcasts = podcasts.slice(0, 4);

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <section className="relative h-[50vh] min-h-[350px] w-full flex items-center justify-center text-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="relative z-10 flex flex-col items-center gap-4 px-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Simply add a photo and write about it
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            Your connection to music.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-24 z-10">
        <Card>
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <PlayCircle />
                    On Air
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <p className="text-lg font-bold">Now Playing: Midday Mix with Ana Beatriz</p>
                <p className="text-muted-foreground">Up next: Afternoon Drive with Carlos Silva</p>
            </CardContent>
        </Card>
      </div>


      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
                 <h2 className="font-headline text-3xl font-bold border-l-4 border-primary pl-4">Latest News</h2>
                <Button variant="ghost" asChild>
                  <Link href="/news">View all <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {latestNews.map((article) => {
                  const articleImage = PlaceHolderImages.find(p => p.id === article.imageId);
                  return (
                    <Link href="/news" key={article.id} className="group flex flex-col gap-2">
                       {articleImage && (
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md">
                            <Image 
                            src={articleImage.imageUrl}
                            alt={articleImage.description}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            data-ai-hint={articleImage.imageHint}
                            />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                             <div className="absolute bottom-2 left-3">
                                <p className="text-sm text-white/80">{article.category}</p>
                                <h3 className="font-semibold text-white group-hover:text-primary transition-colors">{article.title}</h3>
                             </div>
                        </div>
                       )}
                    </Link>
                  )
                })}
              </div>
          </div>

          <div>
             <div className="flex justify-between items-center mb-4">
                <h2 className="font-headline text-3xl font-bold border-l-4 border-primary pl-4">Top 10</h2>
                <Button variant="ghost" asChild>
                  <Link href="/charts">Full Chart <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
             <Card className="h-full">
              <CardContent className="p-2">
                <div className="grid grid-cols-2 gap-2">
                    {topCharts.slice(0, 10).map((song) => {
                        const songImage = PlaceHolderImages.find(p => p.id === `song-${song.rank}`);
                        return (
                            <Link href="/charts" key={song.rank} className="group relative aspect-square w-full overflow-hidden rounded-md">
                                {songImage && (
                                    <Image
                                        src={songImage.imageUrl}
                                        alt={song.title}
                                        fill
                                        className="object-cover transition-transform group-hover:scale-105"
                                        data-ai-hint={songImage.imageHint}
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-2 text-center">
                                    <p className="font-semibold text-white text-sm">{song.rank}. {song.title}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 md:mt-12">
           <div className="flex justify-between items-center mb-4">
                <h2 className="font-headline text-3xl font-bold border-l-4 border-primary pl-4">Podcasts</h2>
                <Button variant="ghost" asChild>
                  <Link href="/podcasts">View all <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {latestPodcasts.map((podcast) => {
                    const podcastImage = PlaceHolderImages.find(p => p.id === podcast.imageId);
                    return (
                         <Link href="/podcasts" key={podcast.id} className="group">
                             <Card className="overflow-hidden">
                                {podcastImage && (
                                    <div className="relative aspect-square w-full overflow-hidden">
                                        <Image
                                            src={podcastImage.imageUrl}
                                            alt={podcast.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform"
                                            data-ai-hint={podcastImage.imageHint}
                                        />
                                    </div>
                                )}
                                <CardHeader className="p-4">
                                    <CardTitle className="text-base font-semibold group-hover:text-primary">{podcast.title}</CardTitle>
                                    <CardDescription className="text-xs">{podcast.host}</CardDescription>
                                </CardHeader>
                            </Card>
                         </Link>
                    )
                })}
              </div>
        </div>

         <div className="mt-8 md:mt-12">
           <div className="flex justify-between items-center mb-4">
                <h2 className="font-headline text-3xl font-bold border-l-4 border-primary pl-4">Photo Gallery</h2>
                <Button variant="ghost" asChild>
                  <Link href="/gallery">View all <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2">
                {PlaceHolderImages.filter(p => p.id.startsWith('gallery-')).slice(0,9).map((image) => (
                    <Link href="/gallery" key={image.id}>
                        <div className="relative aspect-square w-full overflow-hidden rounded-md group">
                            <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            data-ai-hint={image.imageHint}
                            />
                             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                        </div>
                    </Link>
                ))}
              </div>
        </div>

      </div>
      <footer className="w-full mt-12 py-8 bg-card">
          <div className="container mx-auto text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Rádio Conectar. All Rights Reserved.</p>
          </div>
      </footer>
    </div>
  );
}
