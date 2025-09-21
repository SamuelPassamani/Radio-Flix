
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { news, podcasts, schedule, topCharts } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Mic, Music, Newspaper, Users, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MusicRequestForm } from "./requests/MusicRequestForm";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-home');
  const latestNews = news.slice(0, 3);
  const todaysSchedule = schedule.find(day => day.day.toLowerCase() === new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase());
  const featuredPodcast = podcasts[0];
  const featuredPodcastImage = PlaceHolderImages.find(p => p.id === featuredPodcast.imageId);

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center text-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="relative z-10 flex flex-col items-center gap-4 px-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary">Rádio Conectar</h1>
          <p className="text-xl md:text-2xl font-semibold text-foreground max-w-2xl">
            Your connection to the world of music. Live streaming, news, charts, and more.
          </p>
          <Button size="lg" asChild className="mt-4">
            <Link href="/schedule">View Schedule</Link>
          </Button>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 -mt-24">
        
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">

          {/* Latest News */}
          <section>
            <h2 className="text-3xl font-headline font-bold mb-4 flex items-center gap-3">
              <Newspaper className="text-primary" />
              Latest News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map(article => {
                const articleImage = PlaceHolderImages.find(p => p.id === article.imageId);
                return (
                  <Card key={article.id} className="overflow-hidden flex flex-col group">
                    {articleImage && (
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                          src={articleImage.imageUrl}
                          alt={article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                           data-ai-hint={articleImage.imageHint}
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground text-sm line-clamp-2">{article.content}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <Button variant="outline" asChild className="mt-6">
              <Link href="/news">Read More News <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </section>

           <Separator />

          {/* Music Request Form */}
          <section>
             <h2 className="text-3xl font-headline font-bold mb-4 flex items-center gap-3">
                <Music className="text-primary" />
                Request a Song
              </h2>
            <MusicRequestForm />
          </section>

        </div>

        {/* Right Column (Sidebar) */}
        <aside className="lg:col-span-4 space-y-8">

          {/* Top 10 Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-headline font-bold flex items-center gap-3">
                <Music className="text-primary" />
                Top 10 Chart
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {topCharts.slice(0, 5).map(song => (
                  <li key={song.rank} className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-primary w-8 text-center">{song.rank}</div>
                    <div>
                      <p className="font-semibold leading-tight">{song.title}</p>
                      <p className="text-sm text-muted-foreground">{song.artist}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Button variant="outline" asChild className="mt-6 w-full">
                <Link href="/charts">View Full Chart <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* On Air Today */}
          {todaysSchedule && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline font-bold">On Air Today</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {todaysSchedule.shows.slice(0, 3).map(show => (
                    <li key={show.title}>
                      <p className="font-semibold">{show.title}</p>
                      <p className="text-sm text-muted-foreground">{show.time} with {show.host}</p>
                    </li>
                  ))}
                </ul>
                 <Button variant="outline" asChild className="mt-6 w-full">
                  <Link href="/schedule">Full Schedule <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Featured Podcast */}
          {featuredPodcast && featuredPodcastImage && (
            <Card className="overflow-hidden group">
               <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={featuredPodcastImage.imageUrl}
                  alt={featuredPodcast.title}
                  fill
                  sizes="33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={featuredPodcastImage.imageHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-headline font-bold flex items-center gap-3">
                  <Mic className="text-primary" />
                  Featured Podcast
                </CardTitle>
                 <p className="font-semibold pt-2 group-hover:text-primary transition-colors">{featuredPodcast.title}</p>
                 <p className="text-sm text-muted-foreground">{featuredPodcast.date}</p>
              </CardHeader>
              <CardContent>
                <Button variant="default" asChild className="w-full">
                  <Link href="/podcasts">Listen Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </aside>
      </div>

       {/* Gallery Preview */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-headline font-bold mb-4 flex items-center gap-3">
            <Users className="text-primary" />
            From Our Community
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {PlaceHolderImages.filter(p => p.id.startsWith('gallery-')).slice(0,6).map(image => (
                <Link href="/gallery" key={image.id}>
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg group">
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            data-ai-hint={image.imageHint}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    </div>
                </Link>
            ))}
        </div>
      </section>

      <footer className="w-full mt-12 py-8 bg-card">
          <div className="container mx-auto text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Rádio Conectar. All Rights Reserved.</p>
          </div>
      </footer>
    </div>
  );
}
