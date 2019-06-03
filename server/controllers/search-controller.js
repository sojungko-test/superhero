const Debug = require('debug');
const Character = require('../../models/character');

const log = Debug('server:controllers:search-controller');

module.exports = {
  async queryCharacter(req, res) {
    const { params: { q = '' }, query: { alignment = '' } } = req;
    try {
      const chars = await Character.find({
        name: {
          $regex: new RegExp(q, 'i'),
        },
        'biography.alignment': alignment,
      });
      log(`found ${chars.length} characters`);
      res.status(200).send(chars);
    } catch (err) {
      log('error finding character', err);
      res.status(500).send(err);
    }
  },
};
