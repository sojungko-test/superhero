const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const auth = require('./auth-middleware');
const idRoutes = require('./id-routes');
const db = require('./db/config');
const Character = require('./models/character');
const SessionToken = require('./models/session-token');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/auth', (req, res) => {
  const { body } = req;
  const { apiToken } = body;
  const superheroApi = `https://superheroapi.com/api/${apiToken}/1`;

  fetch(superheroApi)
    .then(res => res.json())
    .then((result = {}) => {
      const { response, error } = result;
      if (response === 'error') {
        res.status(400).send(error);
      } else if (response === 'success') {
        // create session token
        const sessionToken = new SessionToken();
        sessionToken.save()
          .then((token) => {
            res.status(200).send(token);
          });
      }
    });
});

app.use(auth);

app.get('/:id', idRoutes);

app.get('/search/:q', async (req, res) => {
  const { params: { q = '' }, query: { type = '' } } = req;
  // const resp = await fetch(`${superheroApi}/search/${query}`);
  // const resJson = await resp.json();
  // res.status(200).send(resJson);
  Character.find({
    name: {
      $regex: new RegExp(q, 'i'),
    },
    biography: {
      alignment: type,
    },
  }, (err, chars) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(chars);
    }
  });
});

app.get('/alignment/:alignment', async (req, res) => {
  const { params: { alignment = '' } } = req;
  Character.find({ biography: { alignment } }, (err, chars) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(chars);
    }
  });
});


app.listen(process.env.PORT || 3001);
