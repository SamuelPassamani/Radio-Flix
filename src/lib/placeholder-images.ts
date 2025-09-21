import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

const basePath = "/Radio-Flix";

function withBasePath(url: string): string {
  // Adiciona o basePath apenas para caminhos relativos (começam com '/')
  if (url.startsWith("/") && !url.startsWith(basePath)) {
    return basePath + url;
  }
  return url;
}

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages.map(img => ({
  ...img,
  imageUrl: withBasePath(img.imageUrl),
}));
