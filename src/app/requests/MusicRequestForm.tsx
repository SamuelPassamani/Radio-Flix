"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitRequest } from "./actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  artist: z.string().min(1, "Artist is required."),
  song: z.string().min(1, "Song title is required."),
});

type FormState = {
  success?: string;
  moderation?: string;
  error?: string;
} | undefined;

export function MusicRequestForm() {
  const { toast } = useToast();
  const [state, formAction] = useFormState<FormState, FormData>(submitRequest, undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      artist: "",
      song: "",
    },
  });

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Request Sent!",
        description: state.success,
      });
      form.reset();
    }
    if (state?.moderation) {
      toast({
        title: "Request Moderated",
        description: state.moderation,
        variant: "destructive",
      });
    }
    if (state?.error) {
      toast({
        title: "Submission Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, toast, form]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Your Request</CardTitle>
        <CardDescription>All requests are subject to review before being played.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Alex Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="artist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artist</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. The Red Tides" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="song"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Song Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Crimson Waves" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
              {form.formState.isSubmitting ? "Submitting..." : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Submit Request
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
