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
  border_width: 4,
  title_text: 'Profile views',
  github_only_text: 'View from GitHub to incwease uwu',
  title_font: 'bold 35px "PT Sans"',
  counter_font: '85px "PT Sans"',
  small_font: '18px "PT Sans"',
};

GlobalFonts.registerFromPath(
  join(FONTS_DIR, 'PTSans-Regular.ttf'), 'PT Sans'
);

type BannerProps = {
  count: number;
  show_is_github_only: boolean;
};

export async function generateNekoBanner(props: BannerProps): Promise<Buffer> {
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
  ctx.strokeStyle = nekonfig.black;
  ctx.lineWidth = nekonfig.border_width;
  ctx.strokeRect(0, 0, img_width, img_height);

  ctx.font = nekonfig.title_font;
  ctx.fillStyle = nekonfig.white;

  ctx.fillText(nekonfig.title_text, img_width + 30, 60);

  ctx.font = nekonfig.counter_font;
  ctx.fillText(props.count.toString(), img_width + 30, 150);

  if (props.show_is_github_only) {
    ctx.font = nekonfig.small_font;
    const text_width = ctx.measureText(nekonfig.github_only_text).width;
    ctx.fillText(nekonfig.github_only_text, nekonfig.width - text_width - 14, nekonfig.height - 12);
  }

  return canvas.toBuffer('image/png');
}
