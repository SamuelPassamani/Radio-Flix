"use client"
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { topCharts } from "@/lib/data";
import { BarChart3, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ChartsPage() {
  const { toast } = useToast();
  const [votedSongs, setVotedSongs] = useState<number[]>([]);

  const handleVote = (songRank: number, songTitle: string) => {
    if (votedSongs.includes(songRank)) {
      toast({
        title: "Already Voted",
        description: `You've already voted for "${songTitle}".`,
        variant: "default",
      });
    } else {
      setVotedSongs([...votedSongs, songRank]);
      toast({
        title: "Vote Cast!",
        description: `Thanks for voting for "${songTitle}"!`,
        variant: "default",
      });
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <BarChart3 className="h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Top 10 Charts</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          The hottest tracks as voted by you, the listeners of Rádio Conectar.
        </p>
      </div>

      <Card>
        <CardContent className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Track</TableHead>
                <TableHead className="text-right">Votes</TableHead>
                <TableHead className="text-right w-[120px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCharts.map((song) => (
                <TableRow key={song.rank}>
                  <TableCell>
                    <div className="font-bold text-2xl text-primary">{song.rank}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-lg">{song.title}</div>
                    <div className="text-muted-foreground">{song.artist}</div>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {song.votes.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant={votedSongs.includes(song.rank) ? "secondary" : "outline"} 
                      size="sm"
                      onClick={() => handleVote(song.rank, song.title)}
                    >
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      {votedSongs.includes(song.rank) ? 'Voted' : 'Vote'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
