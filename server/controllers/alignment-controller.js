const Debug = require('debug');
const Character = require('../../models/character');

const log = Debug('server:controllers:alignment-controller');

module.exports = {
  async getAlignment(req, res) {
    const { params: { alignment = '' } } = req;
    try {
      const chars = await Character.find({
        'biography.alignment': alignment,
      });
      log(`found ${chars.length} ${alignment} characters`);
      res.status(200).send(chars);
    } catch (err) {
      log('error finding characters based on alignment', err);
      res.status(500).send(err);
    }
  },
};
