const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const passport = require('passport');

const jwtLoginStrategy = require('./auth-middleware');
const idRoutes = require('./id-routes');
const db = require('./db/config');
const Character = require('./models/character');
const SessionToken = require('./models/session-token');

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// generates session token
app.post('/auth', (req, res) => {
  const { body } = req;
  console.log('body', body);
  const { apiToken } = body;
  console.log('apiToken', apiToken);
  const superheroApi = `https://superheroapi.com/api/${apiToken}/1`;

  fetch(superheroApi)
    .then(res => res.json())
    .then((result = {}) => {
      const { response, error } = result;
      if (response === 'error') {
        res.status(400).send(error);
      } else if (response === 'success') {
        // find or create session token
        SessionToken.findOne({ apiToken }).exec()
          .then((sessionToken) => {
            if (!sessionToken) {
              const newSessionToken = new SessionToken({
                apiToken,
              });
              newSessionToken.save()
                .select('-_id')
                .then(({ jwt, apiToken }) => {
                  res.status(200).send({
                    sessionToken: jwt,
                    apiToken,
                  });
                });
            } else {
              res.status(200).send({
                sessionToken: sessionToken.jwt,
                apiToken: sessionToken.apiToken,
              });
            }
          });
      }
    });
});

app.use(passport.initialize());
passport.use('jwt', jwtLoginStrategy);

app.get('/:id', idRoutes);

app.get('/search/:q', async (req, res) => {
  const { params: { q = '' }, query: { alignment = '' } } = req;
  Character.find({
    name: {
      $regex: new RegExp(q, 'i'),
    },
    'biography.alignment': alignment,
  }, (err, chars) => {
    if (err) {
      console.log('err', err);
      res.status(500).send(err);
    } else {
      console.log('chars', chars.length);
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
