const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Debug = require('debug');
// const request = require('supertest');

const { expect } = chai;
const log = Debug('test:server.test');

// const app = require('../../server/server');

chai.use(chaiHttp);

const userApiToken = { apiKey: process.env.LEGACY_ACCESS_TOKEN };

describe('/GET /search/:query', function () {
  this.timeout(10000);
  before(function () {
    log('before hook');
    return mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
  });

  after(function (done) {
    log('after hook');
    mongoose.connection.db.dropCollection('users', function () {
      log('closing database');
      mongoose.connection.close();
      done();
    });
  });

  xit('', function () {
    log('test is running now');
  });
});
