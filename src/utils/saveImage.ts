import { promises as fs } from 'node:fs';

const DEFAULT_PATH = './neko.png';

export async function saveImage(url: string, path: string = DEFAULT_PATH) {
  const response = await fetch(url);
  const blob = await response.blob();
  const array_buffer = await blob.arrayBuffer();
  const buffer = Buffer.from(array_buffer);

  await fs.writeFile(path, buffer);
  return path;
}
