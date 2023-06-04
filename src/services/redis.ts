import { createClient } from 'redis';

const client = createClient({
  url: process.env['REDIS_CONNECTION_URL']
});

client.on('error', () => {
  console.error('Failed to connect to redis');
  console.error('Exiting.');
  process.exit(1);
});

client.on('ready', () => {
  console.log('Connected to redis');
});

await client.connect();

export const redis = client;
