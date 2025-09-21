"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { news } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Newspaper } from "lucide-react";

const ARTICLES_PER_PAGE = 6;

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ["All", ...Array.from(new Set(news.map((n) => n.category)))];

  const filteredNews =
    activeCategory === "All"
      ? news
      : news.filter((n) => n.category === activeCategory);

  const totalPages = Math.ceil(filteredNews.length / ARTICLES_PER_PAGE);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <Newspaper className="h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold">News Feed</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Stay updated with the latest in music, events, and what's happening at Rádio Conectar.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="flex flex-wrap gap-2 bg-card p-2 rounded-lg">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "ghost"}
              onClick={() => handleCategoryChange(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedNews.map((article) => {
          const articleImage = PlaceHolderImages.find(p => p.id === article.imageId);
          return (
            <Card key={article.id} className="overflow-hidden flex flex-col group">
              {articleImage && (
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={articleImage.imageUrl}
                    alt={articleImage.description}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={articleImage.imageHint}
                  />
                </div>
              )}
              <CardHeader>
                <CardDescription>{article.category} - {article.date}</CardDescription>
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm">{article.content}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
