// lib/getGalleryImages.ts
import fs from 'fs';
import path from 'path';

export function getGalleryImages(): string[] {
  const galleryDir = path.join(process.cwd(), 'public/images/gallery');
  const files = fs.readdirSync(galleryDir);

  return files
    .filter((file) =>
      /\.(png|jpg|jpeg|webp|avif)$/i.test(file)
    )
    .map((file) => `/images/gallery/${file}`);
}
