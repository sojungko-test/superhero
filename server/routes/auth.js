const express = require('express');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const Debug = require('debug');

const log = Debug('server:routes:auth');
const User = require('../../models/user');

const router = express.Router();

// all routes relative to /auth
router.post('/', async (req, res) => {
  const { body } = req;
  const { apiToken } = body;
  const superheroApi = `https://superheroapi.com/api/${apiToken}/1`;

  try {
    const resp = await fetch(superheroApi);
    const resJson = await resp.json();
    const { response } = resJson;
    if (response === 'success') {
      log('authenticated user against legacy api');
      const foundUser = await User.findOne({ apiToken }).exec();
      log('found user', foundUser);
      if (foundUser) {
        log('user is found', foundUser);
        const { apiToken } = foundUser;
        const payload = { apiToken };
        log('jwt payload', payload);
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        log('sending token to found user');
        res.status(200).send({ token });
      } else {
        log('user not found');
        const newUser = new User({ apiToken });
        const savedUser = await newUser.save();
        log('user saved', savedUser);
        const payload = { apiToken };
        log('jwt payload', payload);
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        log('sending token to saved user');
        res.status(200).send({ token });
      }
    }
  } catch (err) {
    console.log('error fetching', err);
  }

  // fetch(superheroApi)
  //   .then(res => res.json())
  //   .then((result = {}) => {
  //     const { response, error } = result;
  //     if (response === 'error') {
  //       log('error authenticating user against legacy api', error);
  //       res.status(400).send(error);
  //     } else if (response === 'success') {
  //       log('authenticated user against legacy api');
  //       // TODO explore upsert options
  //       User.findOne({ apiToken }).exec()
  //         .then((foundUser) => {
  //           if (foundUser) {
  //           } else {
  //             log('user not found');
  //             const newUser = new User({ apiToken });
  //             newUser.save()
  //               .then((savedUser) => {
  //                 log('saved new user', savedUser);
  //               });
  //           }
  //         });
  //     }
  //   });
});

module.exports = router;
