const fetch = require('node-fetch');
const request = require('supertest');
const Debug = require('debug');
const app = require('../server/server');

const db = require('../db/config');
const Character = require('../models/character');
const User = require('../models/user');

const log = Debug('test:server.test');


describe('', () => {
  beforeAll(() => {
    // authenticate user
    return request(app)
      .post('/auth')
      .send({ apiKey: process.env.LEGACY_ACCESS_TOKEN })
      .end((err, res) => {
        if (err) {
          log('error running beforeAll', err);
        } else {
          log('response', res);
        }
      });
  });

  // afterAll(function() {
  //   // delete user
  // })

  // describe('GET /search/:q', function () {
  //   const query = 'batman';
  //   return request(app)
  //   .set('Authorization', `Bearer ${process.env.LEGACY_ACCESS_TOKEN}`)
  //   .get(`/search/${query}`)
  //   .
  // });
});
