const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const superheroApi = `https://superheroapi.com/api/${process.env.ACCESS_TOKEN}`;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/search/:query', async (req, res) => {
  const { params: { query = '' } } = req;
  const resp = await fetch(`${superheroApi}/search/${query}`);
  const resJson = await resp.json();
  res.status(200).send(resJson);
});

app.listen(process.env.PORT || 3001);
