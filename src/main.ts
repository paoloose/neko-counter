import express from 'express'
import dotenv from 'dotenv';
import { generateNekoBanner } from './banner';
import { redis } from './services/redis';
import { cors } from './middlewares/cors';
import { nocache } from './middlewares/nocache';

dotenv.config();

const app = express();
const PORT = process.env['PORT'] || 3000;

app.use(cors);
app.use(nocache);

app.get('/counter', async (req, res) => {
  const { id } = req.query;

  if (typeof id !== 'string') return res.end(400);

  const neko_raw_info = await redis.get(id);
  let neko_counter_info: CounterInfo | null = null;

  try {
    neko_counter_info = JSON.parse(neko_raw_info!) as CounterInfo;
    neko_counter_info.count++;
  }
  catch {
    neko_counter_info = {
      id,
      count: 1,
      created_at: Date.now()
    };
  }

  const buffer = await generateNekoBanner(neko_counter_info.count);

  res.writeHead(200, {
    'content-type': 'image/png',
    'content-length': buffer.length
  });

  try {
    await redis.set(id, JSON.stringify(neko_counter_info));
  } catch {
    console.error('Failed to update counter');
  }

  return res.end(buffer);
});

app.listen(PORT, () => {
  console.log('Listening for neko requests');
});
