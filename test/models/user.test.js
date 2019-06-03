const { expect } = require('chai');

const User = require('../../models/user');

describe('User model', () => {
  it('should be invalid if apiToken is empty', (done) => {
    const user = new User();
    user.validate((err) => {
      expect(err.errors.apiToken).to.exist;
      done();
    });
  });
});
