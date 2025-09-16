
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, Mic, Radio, Rss } from "lucide-react";
import { LivePlayer } from "./LivePlayer";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/charts", label: "Charts" },
  { href: "/schedule", label: "Schedule" },
  { href: "/gallery", label: "Gallery" },
  { href: "/podcasts", label: "Podcasts"},
  { href: "/requests", label: "Requests" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Logo className="h-10 w-10 text-primary" />
          <span className="font-headline text-2xl font-bold hidden sm:inline">Rádio Conectar</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              asChild
              className={cn(
                "font-medium",
                pathname === link.href ? "text-primary" : "text-foreground"
              )}
            >
              <Link href={link.href} prefetch={false}>
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="hidden md:block">
          <LivePlayer />
        </div>

        <div className="md:hidden flex items-center gap-2">
           <LivePlayer />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background">
              <div className="flex flex-col h-full">
                <div className="p-6">
                    <Link href="/" className="flex items-center gap-2 mb-8" onClick={() => setIsMobileMenuOpen(false)}>
                        <Logo className="h-8 w-8 text-primary" />
                        <span className="font-headline text-2xl font-bold">Rádio Conectar</span>
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
    </header>
  );
}
