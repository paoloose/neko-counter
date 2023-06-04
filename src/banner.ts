import { join } from 'node:path';
import { GlobalFonts, createCanvas, loadImage } from '@napi-rs/canvas';
import { fetchNeko } from './services/nekos';
import { saveImage } from './utils/saveImage';
import { FONTS_DIR } from './utils/paths';

const nekonfig = {
  width: 600,
  height: 200,
  white: '#ffffff',
  black: '#000000',
  title_text: 'Profile views',
  title_font: 'bold 35px "PT Sans"',
  counter_font: '85px "PT Sans"'
};

GlobalFonts.registerFromPath(
  join(FONTS_DIR, 'PTSans-Regular.ttf'), 'PT Sans'
);

export async function generateNekoBanner(count: number): Promise<Buffer> {
  const canvas = createCanvas(nekonfig.width, nekonfig.height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = nekonfig.black;
  ctx.fillRect(0, 0, nekonfig.width, nekonfig.height);

  const neko_img_url = await fetchNeko();
  const neko_img_path = await saveImage(neko_img_url);

  const neko_img = await loadImage(neko_img_path);
  const img_height = nekonfig.height;
  const img_width = img_height * (neko_img.width / neko_img.height);

  ctx.drawImage(neko_img, 0, 0, img_width, img_height);

  ctx.font = nekonfig.title_font;
  ctx.fillStyle = nekonfig.white;

  ctx.fillText(nekonfig.title_text, img_width + 30, 45);

  ctx.font = nekonfig.counter_font;
  ctx.fillText(count.toString(), img_width + 30, 150);

  return canvas.toBuffer('image/png');
}
