const { expect } = require('chai');

const Character = require('../../models/character');

describe('character', () => {
  it('should be invalid if name is empty', (done) => {
    const character = new Character();
    character.validate((err) => {
      expect(err.errors.name).to.exist;
      done();
    });
  });
});
