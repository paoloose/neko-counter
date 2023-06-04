const NEKO_API_URL = 'https://nekos.best/api/v2/neko';
const NEKO_IMG_FALLBACK = 'https://www.seekpng.com/png/detail/298-2984532_669kib-752x1063-neko-girl-fox-cute-anime-girls.png';

export async function fetchNeko() {

  let service_available = true;
  let neko_img_url = '';

  try {
    const neko_response = await fetch(NEKO_API_URL);
    const neko_json = await neko_response.json();
    neko_img_url = neko_json['results'][0]['url'];
  }
  catch {
    service_available = false;
  }

  if (!service_available) {
    neko_img_url = NEKO_IMG_FALLBACK;
  }

  return neko_img_url;
}
