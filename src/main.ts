import express, { json } from 'express'
import { cors } from './middlewares/cors';
import { nocache } from './middlewares/nocache';
import createRoutes from './routes/create';
import counterRoutes from './routes/counter';
import notFound404Route from './routes/404';

const app = express();
const PORT = process.env['PORT'] || 3000;

app.use(cors);
app.use(nocache);
app.use(json());

app.use(createRoutes);
app.use(counterRoutes);

app.use(notFound404Route);

app.listen(PORT, () => {
  console.log('Listening for neko requests');
});
