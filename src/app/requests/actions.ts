"use server";

import { z } from "zod";
import { moderateMusicRequest } from "@/ai/flows/moderate-music-requests";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  artist: z.string().min(1, "Artist is required."),
  song: z.string().min(1, "Song title is required."),
});

type FormState = {
  success?: string;
  moderation?: string;
  error?: string;
};

export async function submitRequest(
  prevState: FormState | undefined,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    name: formData.get("name"),
    artist: formData.get("artist"),
    song: formData.get("song"),
  };

  const validatedFields = formSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: "Invalid data. Please check your input and try again.",
    };
  }

  const { artist, song } = validatedFields.data;
  const requestText = `${song} by ${artist}`;

  try {
    const moderationResult = await moderateMusicRequest({ requestText });

    if (moderationResult.isAppropriate) {
      // In a real application, you would save the request to a database here.
      console.log(`Appropriate request received: "${song}" by ${artist} from ${validatedFields.data.name}`);
      return {
        success: `Your request for "${song}" has been received! Thank you!`,
      };
    } else {
      console.log(`Inappropriate request flagged: "${requestText}". Reason: ${moderationResult.reason}`);
      return {
        moderation: `Your request was flagged: ${moderationResult.reason}. Please try a different song.`,
      };
    }
  } catch (e) {
    console.error("Error during music request moderation:", e);
    return {
      error: "An error occurred while submitting your request. Please try again later.",
    };
  }
}
