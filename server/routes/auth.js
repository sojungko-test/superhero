const express = require('express');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

const router = express.Router();

// all routes relative to /auth
router.post('/', (req, res) => {
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
        User.find({ apiToken }).exec()
          .then((foundUser) => {
            console.log('foundUser', foundUser);
            if (foundUser.length) {
              const { apiToken } = foundUser;
              const token = jwt.sign({ apiToken }, process.env.JWT_SECRET);
              console.log('found user token', token);
              res.status(200).send({ token });
            } else {
              const newUser = new User({ apiToken });
              newUser.save()
                .then((savedUser) => {
                  const { apiToken } = savedUser;
                  console.log('apiToken here', apiToken);
                  const token = jwt.sign({ apiToken }, process.env.JWT_SECRET);
                  console.log('new user token', token);
                  res.status(200).send({ token });
                });
            }
          });
      }
    });
});

module.exports = router;
