const { expect } = require('chai');

const User = require('../../models/user');

describe('character', () => {
  it('should be invalid if name is empty', (done) => {
    const user = new User();
    user.validate((err) => {
      expect(err.errors.name).to.exist;
      done();
    });
  });
});
