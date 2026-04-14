require('dotenv').config();
const express = require('express');
const plotsRouter = require('./routes/plots');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));
app.use('/plots', plotsRouter);

app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'internal server error' });
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`real-estate API listening on :${port}`));
