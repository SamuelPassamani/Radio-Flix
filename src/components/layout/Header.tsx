
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, Radio, Twitter, Facebook, Instagram } from "lucide-react";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/", label: "Sobre-nos" },
  { href: "/news", label: "Notícias" },
  { href: "/charts", label: "Blog" },
  { href: "/schedule", label: "Programação" },
  { href: "/gallery", label: "Galerias de fotos" },
  { href: "/podcasts", label: "Eventos"},
  { href: "/requests", label: "Contato" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-24 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3" prefetch={false}>
          <Logo className="h-16 w-auto" />
        </Link>
        
        <nav className="hidden lg:flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              asChild
              className={cn(
                "font-medium text-lg uppercase hover:border-primary hover:bg-transparent rounded-none transition-all duration-300 px-4",
                pathname === link.href ? "text-primary border-b-4 border-primary" : "text-foreground border-b-4 border-transparent"
              )}
            >
              <Link href={link.href} prefetch={false}>
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1">
                 <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/20">
                    <a href="#" target="_blank"><Facebook /></a>
                 </Button>
                 <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/20">
                    <a href="#" target="_blank"><Twitter /></a>
                 </Button>
                 <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/20">
                    <a href="#" target="_blank"><Instagram /></a>
                 </Button>
            </div>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] bg-card">
                <div className="flex flex-col h-full">
                    <div className="p-6">
                        <Link href="/" className="flex items-center gap-2 mb-8" onClick={() => setIsMobileMenuOpen(false)}>
                            <Logo className="h-8 w-auto" height={32} width={32} />
                            <span className="font-headline text-2xl font-bold">Rádio Flix</span>
                        </Link>
                        <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Button
                            key={link.href}
                            variant="ghost"
                            asChild
                            size="lg"
                            className={cn(
                                "justify-start text-lg",
                                pathname === link.href ? "text-primary bg-primary/10" : "text-foreground"
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                            >
                            <Link href={link.href} prefetch={false}>
                                {link.label}
                            </Link>
                            </Button>
                        ))}
                        </nav>
                    </div>
                </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
       <div className="w-full h-1 bg-primary" />
    </header>
  );
}
