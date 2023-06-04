import express from 'express'
import { generateNekoBanner } from './banner';

const app = express();

const DB: Record<string, number> = {
};

app.get('/counter', async (req, res) => {
  const { id } = req.query;

  if (typeof id !== 'string') return res.end(400);

  if (DB[id] === undefined) {
    DB[id] = 0;
  }
  const count = ++DB[id];

  const buffer = await generateNekoBanner(count);
  res.writeHead(200, {
    'content-type': 'image/png',
    'content-length': buffer.length
  });
  res.end(buffer);
});

app.listen(8080, () => {
  console.log('Listening for neko requests');
});
