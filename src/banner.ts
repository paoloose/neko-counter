import { join } from 'node:path';
import { GlobalFonts, createCanvas, loadImage } from '@napi-rs/canvas';
import { fetchNeko } from './services/nekos';
import { saveImage } from './utils/saveImage';
import { FONTS_DIR } from './utils/paths';

const nekonfig = {
  width: 600,
  height: 200,
  badge_size: {
    width: 200,
    height: 35
  },
  color: '#ffffff',
  bg_color: '#000000',
  badge_color: '#c977da',
  border_width: 4,
  title_text: 'Profile views',
  github_only_text: 'View from GitHub to incwease uwu',
  title_font: 'bold 35px "PT Sans"',
  counter_font: '85px "PT Sans"',
  small_font: '18px "PT Sans"',
  badge_font: '20px "PT Sans"',
  style: 'random_neko' as 'random_neko' | 'badge'
};

GlobalFonts.registerFromPath(
  join(FONTS_DIR, 'PTSans-Regular.ttf'), 'PT Sans'
);

type BannerProps = {
  count: number;
  show_is_github_only: boolean;
  bg_color?: string;
  color?: string;
  title?: string;
  style?: string;
};

export async function generateNekoBanner(props: BannerProps): Promise<Buffer> {
  const bg_color = props.bg_color || nekonfig.bg_color;
  const text_color = props.color || nekonfig.color;
  const title_text = props.title || nekonfig.title_text;
  const style = props.style || nekonfig.style;

  if (style === 'badge') {
    const canvas = createCanvas(nekonfig.badge_size.width, nekonfig.badge_size.height);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, nekonfig.badge_size.width, nekonfig.badge_size.height);

    const badge_width = nekonfig.badge_size.width;
    const badge_height = nekonfig.badge_size.height;

    const radius = 6;
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(badge_width - radius, 0);
    ctx.quadraticCurveTo(badge_width, 0, badge_width, radius);
    ctx.lineTo(badge_width, badge_height - radius);
    ctx.quadraticCurveTo(badge_width, badge_height, badge_width - radius, badge_height);
    ctx.lineTo(radius, badge_height);
    ctx.quadraticCurveTo(0, badge_height, 0, badge_height - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.clip();

    ctx.lineWidth = radius;
    ctx.fillStyle = bg_color;
    ctx.fillRect(0, 0, badge_width, badge_height);

    ctx.fillStyle = nekonfig.badge_color;
    ctx.fillRect(badge_width / 2, 0, badge_width / 2, badge_height);

    ctx.font = nekonfig.badge_font;
    ctx.fillStyle = text_color;
    ctx.fillText('visits >w<', 8, 24);
    ctx.fillText(props.count.toString(), badge_width / 2 + 12, 24);


    return canvas.toBuffer('image/png');
  }
  else {
    const canvas = createCanvas(nekonfig.width, nekonfig.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = bg_color;
    ctx.fillRect(0, 0, nekonfig.width, nekonfig.height);

    const neko_img_url = await fetchNeko();
    const neko_img_path = await saveImage(neko_img_url);

    const neko_img = await loadImage(neko_img_path);
    const img_height = nekonfig.height;
    const img_width = img_height * (neko_img.width / neko_img.height);

    ctx.drawImage(neko_img, 0, 0, img_width, img_height);
    ctx.strokeStyle = bg_color;
    ctx.lineWidth = nekonfig.border_width;
    ctx.strokeRect(0, 0, img_width, img_height);

    ctx.font = nekonfig.title_font;
    ctx.fillStyle = text_color;

    ctx.fillText(title_text, img_width + 30, 60);

    ctx.font = nekonfig.counter_font;
    ctx.fillText(props.count.toString(), img_width + 30, 150);

    if (props.show_is_github_only) {
      ctx.font = nekonfig.small_font;
      const text_width = ctx.measureText(nekonfig.github_only_text).width;
      ctx.fillText(nekonfig.github_only_text, nekonfig.width - text_width - 14, nekonfig.height - 12);
    }
    return canvas.toBuffer('image/png');
  }
}
