import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { news, schedule, topCharts } from "@/lib/data";
import { ArrowRight, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { podcasts } from "@/lib/data";
import { MusicRequestForm } from "./requests/MusicRequestForm";
import { Separator } from "@/components/ui/separator";

function WidgetContainer({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={className}>
      <h3 className="text-xl font-bold font-headline border-b-4 border-primary pb-2 mb-4 uppercase">{title}</h3>
      {children}
    </div>
  )
}

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-home');
  const latestNews = news.slice(0, 4);
  const latestBlog = news.slice(0, 3);

  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center text-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            sizes="100vw"
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-start gap-4 px-4 max-w-6xl w-full mx-auto">
          <div className="border-l-8 border-primary pl-6">
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-white text-left">
              OU SIMPLESMENTE
            </h1>
            <p className="font-headline text-3xl md:text-5xl text-white/80 text-left">
              ADICIONE UMA FOTO E
            </p>
            <p className="font-headline text-3xl md:text-5xl text-white/80 text-left">
              ESCREVA SOBRE ELA
            </p>
          </div>
        </div>
      </section>

      {/* On Air Section */}
      <div className="container mx-auto px-4 -mt-20 z-10">
        <Card className="bg-primary/90 backdrop-blur-sm border-0 text-primary-foreground rounded-none">
          <CardHeader className="flex-row items-center justify-between p-3">
              <div className="flex items-center gap-4">
                <p className="font-headline text-lg uppercase">No Ar:</p>
                <p className="font-semibold text-lg">Midday Mix with Ana Beatriz</p>
              </div>
              <div className="text-right hidden sm:block">
                  <p className="text-sm opacity-80">A Seguir:</p>
                  <p className="font-semibold">Afternoon Drive</p>
              </div>
          </CardHeader>
        </Card>
      </div>

      {/* Latest News Bar */}
       <div className="container mx-auto px-4 mt-8">
         <h2 className="text-xl font-bold font-headline border-b-4 border-primary pb-2 mb-4 uppercase">Últimas Noticias</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {latestNews.map((article) => {
                  const articleImage = PlaceHolderImages.find(p => p.id === article.imageId);
                  return (
                     <Link href="/news" key={article.id} className="group flex flex-col bg-card hover:bg-muted/50 transition-colors rounded-lg overflow-hidden">
                       {articleImage && (
                        <div className="relative w-full h-48 overflow-hidden">
                            <Image 
                            src={articleImage.imageUrl}
                            alt={articleImage.description}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover"
                            data-ai-hint={articleImage.imageHint}
                            />
                        </div>
                       )}
                       <div className="p-4">
                            <h3 className="font-semibold group-hover:text-primary transition-colors leading-tight">{article.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{article.date}</p>
                       </div>
                    </Link>
                  )
                })}
            </div>
      </div>

      {/* 3-Column Layout */}
      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-8">
            <WidgetContainer title="Peça sua música">
                <Card className="bg-primary text-primary-foreground p-4 text-center">
                  <h4 className="font-headline text-2xl">Clique aqui e faça o seu</h4>
                  <p className="text-lg">Pedido de música</p>
                </Card>
            </WidgetContainer>
             <WidgetContainer title="Galeria de fotos">
                <div className="grid grid-cols-3 gap-2">
                    {PlaceHolderImages.filter(p => p.id.startsWith('gallery-')).slice(0,9).map((image) => (
                        <Link href="/gallery" key={image.id}>
                            <div className="relative aspect-square w-full overflow-hidden rounded-md group border-2 border-transparent hover:border-primary">
                                <Image
                                src={image.imageUrl}
                                alt={image.description}
                                fill
                                sizes="(max-width: 1024px) 33vw, 10vw"
                                className="object-cover"
                                data-ai-hint={image.imageHint}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
                 <Button variant="outline" asChild className="mt-4 w-full">
                  <Link href="/gallery">Ver galeria completa <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </WidgetContainer>
          </div>

          {/* Center Column */}
          <div className="lg:col-span-6 space-y-8">
             <WidgetContainer title="Vídeo em destaque">
                <div className="aspect-video bg-card rounded-lg overflow-hidden">
                     <iframe src='//www.youtube.com/embed/0KSOMA3QBU0?theme=dark' width='100%' height='100%' frameBorder='0' allowFullScreen></iframe> 
                </div>
             </WidgetContainer>
             <WidgetContainer title="Últimas do blog">
                <div className="space-y-6">
                    {latestBlog.map((article) => {
                        const articleImage = PlaceHolderImages.find(p => p.id === article.imageId);
                        return (
                            <Card key={article.id} className="overflow-hidden group flex flex-col md:flex-row">
                                {articleImage && (
                                    <div className="relative aspect-video md:aspect-square w-full md:w-1/3 overflow-hidden">
                                    <Image
                                        src={articleImage.imageUrl}
                                        alt={article.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover"
                                        data-ai-hint={articleImage.imageHint}
                                    />
                                    </div>
                                )}
                                <div className="p-6 flex flex-col justify-center md:w-2/3">
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{article.title}</CardTitle>
                                    <CardDescription className="mt-2">{article.date}</CardDescription>
                                    <p className="text-muted-foreground mt-4 text-sm line-clamp-3">{article.content}</p>
                                </div>
                            </Card>
                        )
                    })}
                </div>
             </WidgetContainer>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-3 space-y-8">
              <WidgetContainer title="Enquete">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Como está o novo site?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Enquete fechada.</p>
                    </CardContent>
                </Card>
              </WidgetContainer>
              <WidgetContainer title="Top 10">
                <div className="space-y-2">
                    {topCharts.slice(0,10).map((song) => (
                         <Card key={song.rank} className="overflow-hidden group">
                           <div className="flex items-center">
                              <div className="bg-primary text-primary-foreground p-3 flex items-center justify-center">
                                <p className="font-headline text-2xl font-bold">{String(song.rank).padStart(2, '0')}</p>
                              </div>
                               <div className="p-3">
                                  <p className="font-semibold leading-tight group-hover:text-primary transition-colors">{song.title}</p>
                                  <p className="text-sm text-muted-foreground">{song.artist}</p>
                               </div>
                           </div>
                         </Card>
                    ))}
                </div>
              </WidgetContainer>
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
