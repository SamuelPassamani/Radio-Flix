
"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { sliderData } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

export function HeroCarousel() {
    return (
        <section className="relative w-full">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
                className="w-full"
            >
                <CarouselContent>
                    {sliderData.map((slide) => {
                        const slideImage = PlaceHolderImages.find(p => p.id === slide.imageId);
                        return (
                            <CarouselItem key={slide.id}>
                                <div className="relative h-[60vh] min-h-[400px] w-full">
                                    {slideImage && (
                                        <Link href={slide.link || '#'} className="block h-full w-full">
                                            <Image
                                                src={slideImage.imageUrl}
                                                alt={slide.title || slideImage.description}
                                                fill
                                                sizes="100vw"
                                                className="object-cover"
                                                data-ai-hint={slideImage.imageHint}
                                                priority={slide.id === 1}
                                            />
                                        </Link>
                                    )}
                                    <div className="absolute inset-0 bg-black/50" />
                                    {(slide.title || slide.description) && (
                                        <div className="absolute inset-0 z-10 flex flex-col justify-center items-start gap-4 px-4 max-w-6xl w-full mx-auto">
                                            <div className="border-l-8 border-primary pl-6">
                                                {slide.title && (
                                                    <h1 className="font-headline text-4xl md:text-6xl font-bold text-white text-left">
                                                        {slide.title}
                                                    </h1>
                                                )}
                                                {slide.description && (
                                                    <p className="font-headline text-2xl md:text-4xl text-white/80 text-left mt-2">
                                                        {slide.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                    <div className="flex gap-4">
                        <CarouselPrevious className="relative translate-y-0 top-0 left-0 bg-background/50 hover:bg-primary border-white/50 text-white" />
                        <CarouselNext className="relative translate-y-0 top-0 right-0 bg-background/50 hover:bg-primary border-white/50 text-white" />
                    </div>
                </div>
            </Carousel>
        </section>
    )
}
