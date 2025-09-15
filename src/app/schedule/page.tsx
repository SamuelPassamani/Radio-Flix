import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { schedule } from "@/lib/data";
import { CalendarDays } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function SchedulePage() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <CalendarDays className="h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Program Schedule</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Never miss your favorite show. Here's what's playing this week on Rádio Conectar.
        </p>
      </div>

      <Accordion type="single" collapsible defaultValue={today} className="w-full max-w-4xl mx-auto">
        {schedule.map((daySchedule) => (
          <AccordionItem value={daySchedule.day} key={daySchedule.day}>
            <AccordionTrigger className="text-2xl font-headline hover:no-underline">
              {daySchedule.day}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                {daySchedule.shows.map((show) => (
                  <Card key={show.title} className="bg-card-foreground/5">
                    <CardHeader>
                      <CardDescription>{show.time}</CardDescription>
                      <CardTitle className="text-xl">{show.title}</CardTitle>
                      <CardDescription>with {show.host}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
