import { Music } from "lucide-react";
import { MusicRequestForm } from "./MusicRequestForm";

export default function RequestsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <Music className="h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold uppercase">Peça sua música</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Quer ouvir sua faixa favorita na Rádio Conectar? Preencha o formulário abaixo e faremos o nosso melhor para tocá-la para você.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <MusicRequestForm />
      </div>
    </div>
  );
}
