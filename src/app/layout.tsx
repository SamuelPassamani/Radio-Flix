import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Toaster } from "@/components/ui/toaster"
import { RightSidebarPlayer } from '@/components/layout/RightSidebarPlayer';

export const metadata: Metadata = {
  title: 'Rádio Conectar',
  description: 'Your connection to the world of music.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Removendo as fontes antigas e adicionando as novas */}
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      {/* O ideal seria definir as novas fontes no tailwind.config.js, mas por simplicidade vamos manter o body como está por enquanto */}
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <RightSidebarPlayer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
