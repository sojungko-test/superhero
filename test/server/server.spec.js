const mongoose = require('mongoose');
const chai = require('chai');

const { expect } = chai;
const request = require('supertest');
const Debug = require('debug');
const app = require('../../server/server');

// const db = require('../../db/config');
const Character = require('../../models/character');
const User = require('../../models/user');

const log = Debug('test:server.test');

// chai.use(chaiHttp);

const userApiToken = { apiKey: process.env.LEGACY_ACCESS_TOKEN };
const authenticatedUser = request.agent(app);


describe.only('', () => {
  // TODO before not being run before other tests
  before((done) => {
    mongoose.connect('mongodb://localhost:27017/test');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('We are connected to test database!');
      done();
    });
  });
  // beforeEach(() => {
  //   authenticatedUser.post('/auth')
  //     .send(userApiToken)
  //     .end((err, res) => {
  //       console.log('before err', err);
  //       console.log('before res', res);
  //     });
  // });
  describe('/GET search/:query', () => {
    authenticatedUser
      .get('/search/batman')
      .end((err, res) => {
        console.log('error here', err);
        console.log('res', res);
      });
  });
});
