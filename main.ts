import express from 'express'

const app = express();

const DB = {
};

app.get('/counter', (req, res) => {
  const id = req.query.id;

  if (typeof id !== 'string') return res.end(400);

  if (DB[id] === undefined) {
    DB[id] = 0;
  }
  const count = ++DB[id];

  // profile views: {count}
  res.type('image/svg+xml').send(
    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="20">
      <text x="0" y="15" fill="#000">${count}</text>
    </svg>`
  );
});

app.listen(8080, () => {
  console.log('Listening for neko requests');
});
