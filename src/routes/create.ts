import { Router } from 'express';
import { NekoUser } from '../schemas/NekoUser';

const router = Router();

router.get('/create', async (req, res) => {
  if (!req.query['id'] || !req.query['password']) {
    return res.status(400).send({
      status: 400,
      error: 'How bad! It seems like the content is a bit nyot to my wiking! Pwease, oh pwease, take a peek at the docs over hewe: https://github.com/paowoowoo/neko-countew',
    });
  }
  const payload: NekoCreationPayload = {
    id: req.query['id'] as string,
    password: req.query['password'] as string,
    github_only: req.query['github_only'] ? req.query['github_only'] === 'true' : true
  }

  const registered = await NekoUser.exists(payload.id);
  if (registered) {
    return res.status(400).send({
      status: 400,
      error: 'Oh noesie-wosies! It seems like you\'ve already cwated a pwofile! Pwease, oh pwease, use a diffewent id! (´；ω；｀)'
    });
  }

  const new_profile = new NekoUser({
    id: payload.id,
    password: payload.password,
    count: 0,
    github_only: payload.github_only ?? true
  });

  try {
    await new_profile.save();
  }
  catch {
    return res.status(500).send({
      status: 500,
      error: 'Something went wrong... so sowwy! (´；ω；｀)'
    });
  }

  res.send({
    status: 200,
    message: 'Yay! You\'ve created a new neko profile! Now you can use it to count your profie view!'
  });
});

router.post('/create', async (req, res) => {
  const payload = req.body;

  if (req.headers['content-type'] !== 'application/json') {
    return res.status(400).send({
      status: 400,
      error: 'Oh noesie-wosies! Invawid content type! It was supposed to be application/json, but it\'s a no-no!'
    });
  }

  if (!isValidPayload(payload)) {
    return res.status(400).send({
      status: 400,
      error: 'How bad! It seems like the content is a bit nyot to my wiking! Pwease, oh pwease, take a peek at the docs over hewe: https://github.com/paowoowoo/neko-countew',
    });
  }

  const registered = await NekoUser.exists(payload.id);
  if (registered) {
    return res.status(400).send({
      status: 400,
      error: 'Oh noesie-wosies! It seems like you\'ve already cwated a pwofile! Pwease, oh pwease, use a diffewent id! (´；ω；｀)'
    });
  }

  const new_profile = new NekoUser({
    id: payload.id,
    password: payload.password,
    count: 0,
    github_only: payload.github_only ?? true
  });

  try {
    await new_profile.save();
  }
  catch {
    return res.status(500).send({
      status: 500,
      error: 'Something went wrong... so sowwy! (´；ω；｀)'
    });
  }

  res.send({
    status: 200,
    message: 'Yay! You\'ve created a new neko profile! Now you can use it to count your profie view!'
  });
});

// Type guard for validating body of POST /create
function isValidPayload(payload: any): payload is NekoCreationPayload {
  return (
    typeof payload === 'object' &&
    typeof payload.id === 'string' &&
    typeof payload.password === 'string'
  );
}

export default router;
