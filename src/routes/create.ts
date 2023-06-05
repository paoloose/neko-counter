import { Router } from 'express';
import { NekoUser } from '../schemas/NekoUser';

const router = Router();

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
      payload: payload || 10
    });
  }

  const registered = await NekoUser.exists(payload.id);
  if (registered) {
    return res.status(400).send({
      status: 400,
      error: 'Oh noesie-wosies! It seems like you\'ve already cwated a pwofile! Pwease, oh pwease, use a diffewent id!'
    });
  }

  const new_profile = new NekoUser({
    id: payload.id,
    password: payload.password,
    count: 0
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
