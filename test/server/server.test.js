const http = require('http');
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Debug = require('debug');
const User = require('../../models/user');
const connectDb = require('../../db/config');

const { expect } = chai;
const log = Debug('test:server.test');

const { createApp } = require('../../server/server');

chai.use(chaiHttp);

const userApiToken = { apiToken: process.env.LEGACY_ACCESS_TOKEN };
let app;
let server;
let token;

describe('GET /api/search/:query', function () {
  before(function (done) {
    connectDb().then(() => {
      app = createApp();
      server = http.createServer(app).listen(3000, done);
    });
  });

  describe('Unauthoritized', function () {
    it('Returns 401 status code', function () {
      chai.request(app)
        .get('/api/search/batman')
        .end(function (err, res) {
          expect(res.statusCode).to.equal(401);
        });
    });
  });

  describe('Authorized', function () {
    this.timeout(10000);
    before(function (done) {
      chai.request(app)
        .post('/auth')
        .send({ apiToken: process.env.LEGACY_ACCESS_TOKEN })
        .end((err, res) => {
          const { body = {} } = res;
          const { token: receivedToken } = body;
          token = receivedToken;
          done();
        });
    });

    it('Returns 200 status code', function () {
      chai.request(app)
        .get('/api/search/batman')
        .set('Authorization', `Bearer ${token}`)
        .end(function (err, res) {
          expect(res.statusCode).to.equal(200);
        });
    });

    after(async function () {
      try {
        await User.deleteOne(userApiToken);
      } catch (err) {
        log('Error deleting test user', err);
      }
    });
  });

  after(function (done) {
    mongoose.connection.db.dropCollection('users', function () {
      mongoose.connection.close();
      server.close();
      done();
    });
  });
});
