import { Music } from "lucide-react";
import { MusicRequestForm } from "./MusicRequestForm";

export default function RequestsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <Music className="h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Request a Song</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Want to hear your favorite track on Rádio Conectar? Fill out the form below and we'll do our best to play it for you.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <MusicRequestForm />
      </div>
    </div>
  );
}
