import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Processes the raw song title from the stream (e.g., "Song Title - Artist Name")
 * and separates it into a title and artist object.
 *
 * @param trackTitle The raw string provided by the streaming service.
 * @returns An object with `title` (always lowercase) and `artist`.
 */
export function parseTrackTitle(trackTitle: string): { title: string; artist: string } {
  // Return a default value if the title is empty or null
  if (!trackTitle) {
    return { title: 'rádio conectar', artist: '' };
  }

  const separator = ' - ';

  // If the separator isn't found, we assume the whole string is the title
  // and there is no artist information to display.
  if (!trackTitle.includes(separator)) {
    return { title: trackTitle.toLowerCase(), artist: '' };
  }

  // The logic assumes the format is "Title - Artist".
  // The first part becomes the title, and everything after that is the artist.
  const parts = trackTitle.split(separator);
  const title = parts[0].trim();
  const artist = parts.slice(1).join(separator).trim();

  return {
    // Title is always converted to lowercase as requested.
    title: title.toLowerCase(),
    // The artist's name is used exactly as it was received.
    artist: artist,
  };
}
