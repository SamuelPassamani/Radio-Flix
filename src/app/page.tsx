import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { news, schedule, topCharts } from "@/lib/data";
import { ArrowRight, Music, Calendar, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-home');
  const latestNews = news.slice(0, 3);
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySchedule = schedule.find(day => day.day === today)?.shows.slice(0, 3) || [];

  return (
    <div className="flex flex-col gap-12 md:gap-20">
      <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center text-center">
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
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center gap-6 px-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
            Rádio Conectar
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            Your daily frequency for the best music, news, and events. Stay tuned, stay connected.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
            <Link href="/requests">
              Request a Song <Music className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-headline text-2xl">Latest News</CardTitle>
                <Button variant="ghost" asChild>
                  <Link href="/news">View all <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardHeader>
              <CardContent className="grid gap-6">
                {latestNews.map((article) => {
                  const articleImage = PlaceHolderImages.find(p => p.id === article.imageId);
                  return (
                    <Link href="/news" key={article.id} className="group flex gap-4 items-center">
                      {articleImage && (
                        <Image 
                          src={articleImage.imageUrl}
                          alt={articleImage.description}
                          width={120}
                          height={80}
                          className="rounded-lg object-cover aspect-[3/2]"
                          data-ai-hint={articleImage.imageHint}
                        />
                      )}
                      <div>
                        <p className="text-sm text-muted-foreground">{article.category} - {article.date}</p>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{article.title}</h3>
                      </div>
                    </Link>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          <div>
             <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-headline text-2xl">Top Charts</CardTitle>
                <Button variant="ghost" asChild>
                  <Link href="/charts">Full Chart <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    {topCharts.slice(0, 5).map((song) => (
                      <TableRow key={song.rank}>
                        <TableCell className="font-bold text-lg text-primary">{song.rank}</TableCell>
                        <TableCell>
                          <p className="font-semibold">{song.title}</p>
                          <p className="text-sm text-muted-foreground">{song.artist}</p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 md:mt-12">
           <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-headline text-2xl">Today's Schedule</CardTitle>
                <Button variant="ghost" asChild>
                  <Link href="/schedule">Full Schedule <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {todaySchedule.length > 0 ? todaySchedule.map((show) => (
                   <div key={show.title} className="bg-card-foreground/5 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-primary">{show.time}</p>
                    <p className="font-bold">{show.title}</p>
                    <p className="text-sm text-muted-foreground">{show.host}</p>
                   </div>
                )) : (
                  <p className="text-muted-foreground col-span-3">No shows scheduled for today. Check back later!</p>
                )}
              </CardContent>
           </Card>
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
