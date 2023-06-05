import { Router } from 'express';
import { generateNekoBanner } from '../banner';
import { NekoUser } from '../schemas/NekoUser';

const router = Router();

router.get('/counter/:profile', async (req, res) => {
  const { profile: profile_id } = req.params;

  let neko_info = await NekoUser.find(profile_id);

  if (!neko_info) {
    return res.status(400).json({
      status: 400,
      error: 'Pwease, pwease, cwate a profile first. You can find all the cute instructionsies hewe: https://github.com/paoloose/neko-counter#create-profile'
    });
  }

  const user_agent = req.headers['user-agent'] || '';
  const viewing_from_github = user_agent.includes('github-camo');
  if ((neko_info.props.github_only && !viewing_from_github) === false) {
    neko_info.props.count++;
  }

  const banner_buffer = await generateNekoBanner({
    count: neko_info.props.count,
    show_is_github_only: neko_info.props.github_only && !viewing_from_github
  });

  try {
    await neko_info.save();
  }
  catch {
    console.error(`[${(new Date()).toUTCString()}] Failed to save neko info for ${profile_id}`);
  }

  res.writeHead(200, {
    'content-type': 'image/png',
    'content-length': banner_buffer.length
  });

  return res.end(banner_buffer);
});

export default router;
