import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Camera } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function GalleryPage() {
  const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith('gallery-'));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <Camera className="h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Photo Gallery</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          A glimpse into the world of Rádio Conectar. Photos from events, our studio, and our amazing fans.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image) => (
          <Dialog key={image.id}>
            <DialogTrigger asChild>
              <div className="relative aspect-square w-full overflow-hidden rounded-lg cursor-pointer group">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={image.imageHint}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl">Photo View</DialogTitle>
                <DialogDescription>
                  {image.description}
                </DialogDescription>
              </DialogHeader>
              <div className="relative aspect-video w-full mt-4">
                 <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-contain rounded-md"
                  data-ai-hint={image.imageHint}
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
