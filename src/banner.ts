import { createCanvas, loadImage } from '@napi-rs/canvas';
import { fetchNeko } from './services/nekos';
import { saveImage } from './utils/saveImage';

const config = {
  width: 600,
  height: 200,
  white: '#ffffff',
  black: '#000000'
};

export async function generateNekoBanner(count: number): Promise<Buffer> {
  const canvas = createCanvas(config.width, config.height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = config.black;
  ctx.fillRect(0, 0, config.width, config.height);

  const neko_img_url = await fetchNeko();
  const neko_img_path = await saveImage(neko_img_url);

  const neko_img = await loadImage(neko_img_path);
  const img_height = config.height;
  const img_width = img_height * (neko_img.width / neko_img.height);

  ctx.drawImage(neko_img, 0, 0, img_width, img_height);

  ctx.font = 'bold 30px sans-serif';
  ctx.fillStyle = config.white;

  ctx.fillText('Profile views', img_width + 30, 45);

  ctx.font = '70px sans-serif';
  ctx.fillText(count.toString(), img_width + 30, 145);

  return canvas.toBuffer('image/png');
}
