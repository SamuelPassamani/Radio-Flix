'use server';

/**
 * @fileOverview This file defines a Genkit flow for moderating music requests using AI.
 *
 * It includes:
 * - moderateMusicRequest - A function to moderate a music request.
 * - ModerateMusicRequestInput - The input type for the moderation function.
 * - ModerateMusicRequestOutput - The output type for the moderation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateMusicRequestInputSchema = z.object({
  requestText: z
    .string()
    .describe('The text content of the music request submitted by a user.'),
});
export type ModerateMusicRequestInput = z.infer<typeof ModerateMusicRequestInputSchema>;

const ModerateMusicRequestOutputSchema = z.object({
  isAppropriate: z
    .boolean()
    .describe(
      'A boolean value indicating whether the music request is appropriate for broadcast (true) or not (false).'
    ),
  reason: z
    .string()
    .describe(
      'A short explanation of why the request was deemed inappropriate, if applicable.  If the request is appropriate, this field should be empty.'
    ),
});
export type ModerateMusicRequestOutput = z.infer<typeof ModerateMusicRequestOutputSchema>;

export async function moderateMusicRequest(input: ModerateMusicRequestInput): Promise<ModerateMusicRequestOutput> {
  return moderateMusicRequestFlow(input);
}

const moderateMusicRequestPrompt = ai.definePrompt({
  name: 'moderateMusicRequestPrompt',
  input: {schema: ModerateMusicRequestInputSchema},
  output: {schema: ModerateMusicRequestOutputSchema},
  prompt: `You are an AI content moderator for a radio station. Your task is to determine whether a user-submitted music request is appropriate for broadcast.

  Here are the guidelines for determining appropriateness:
  - The request should not contain any offensive language, hate speech, or sexually suggestive content.
  - The request should not promote violence, illegal activities, or discrimination of any kind.
  - The request should be relevant to the radio station's target audience and musical style.
  - The request should not contain any spam or promotional material.

  Based on these guidelines, please analyze the following music request and determine if it is appropriate for broadcast.

  Music Request: {{{requestText}}}

  Respond with a JSON object that contains two fields:
  - isAppropriate: A boolean value indicating whether the request is appropriate (true) or not (false).
  - reason: A short explanation of why the request was deemed inappropriate, if applicable.  If the request is appropriate, this field should be empty.

  Example 1:
  Input: {"requestText": "I want to hear some hardcore rap with explicit lyrics"}
  Output: {"isAppropriate": false, "reason": "Contains explicit content"}

  Example 2:
  Input: {"requestText": "Play some Taylor Swift!"}
  Output: {"isAppropriate": true, "reason": ""}
  `,
});

const moderateMusicRequestFlow = ai.defineFlow(
  {
    name: 'moderateMusicRequestFlow',
    inputSchema: ModerateMusicRequestInputSchema,
    outputSchema: ModerateMusicRequestOutputSchema,
  },
  async input => {
    const {output} = await moderateMusicRequestPrompt(input);
    return output!;
  }
);
