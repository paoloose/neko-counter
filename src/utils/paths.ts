import { join } from 'node:path';

export const BASE_DIR = process.cwd();
export const CACHE_DIR = join(BASE_DIR, 'cache');
export const FONTS_DIR = join(BASE_DIR, 'fonts');
