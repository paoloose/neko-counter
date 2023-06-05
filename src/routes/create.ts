import { Router } from 'express';

const router = Router();

router.post('/create', async (req, res) => {
  const payload = req.body;

  if (req.headers['content-type'] !== 'application/json') {
    return {
      status: 400,
      error: 'Oh noesie-wosies! Invawid content type! It was supposed to be application/json, but it\'s a no-no!'
    };
  }

  if (!isValidPayload(payload)) {
    return {
      status: 400,
      error: 'It seems wike the content is a bit nyot to my wiking! Pwease, oh pwease, take a peek at the docs over hewe: https://github.com/paowoowoo/neko-countew'
    };
  }

});

// Type guard for validating body of POST /create
function isValidPayload(payload: any): payload is CreatePayload {
  return (
    typeof payload === 'object' &&
    typeof payload.id === 'string' &&
    typeof payload.password === 'string'
  );
}

export default router;
