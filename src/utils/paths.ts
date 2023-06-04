import { join } from 'node:path';
import { mkdir } from 'node:fs/promises';

export const BASE_DIR = process.cwd();
export const CACHE_DIR = join(BASE_DIR, 'cache');
export const FONTS_DIR = join(BASE_DIR, 'fonts');

mkdir(CACHE_DIR, { recursive: true }).catch(console.error);
mkdir(FONTS_DIR, { recursive: true }).catch(console.error);
