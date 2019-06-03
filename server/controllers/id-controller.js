const Debug = require('debug');
const Character = require('../../models/character');

const log = Debug('server:controllers:id-controller');

module.exports = {
  async getCharacterById(req, res) {
    const { params: { id = '' } } = req;
    try {
      const char = await Character.findOne({ id });
      log(`found character of id ${id}`);
      res.status(200).send(char);
    } catch (err) {
      log('error finding character based on id', err);
      res.status(500).send(err);
    }
  },
  async getCharacterDetail(req, res) {
    const { params: { id = '', detailType = '' } } = req;

    try {
      const result = await Character.find({ id })
        .select(detailType)
        .exec();
      log(`found the ${detailType} of character id ${id}`);
      res.status(200).send(result);
    } catch (err) {
      log(`error finding ${detailType} of character id ${id}`);
      res.status(500).send(err);
    }
  },
};
