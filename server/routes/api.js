const express = require('express');
const Debug = require('debug');
const Character = require('../../models/character');

const router = express.Router();
const log = Debug('server:routes:api');

// all paths are relative to /api
router.get('/search/:q', async (req, res) => {
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
});

// TODO validate alignment
router.get('/alignment/:alignment', async (req, res) => {
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
});

// TODO validate id
router.get('/:id', async (req, res) => {
  const { params: { id = '' } } = req;
  try {
    const char = await Character.findOne({ id });
    log(`found character of id ${id}`);
    res.status(200).send(char);
  } catch (err) {
    log('error finding character based on id', err);
    res.status(500).send(err);
  }
});

// TODO validate id, queryType
router.get('/:id/:queryType', async (req, res) => {
  const { params: { id = '', queryType = '' } } = req;

  try {
    const result = await Character.find({ id })
      .select(queryType)
      .exec();
    log(`found the ${queryType} of character id ${id}`);
    res.status(200).send(result);
  } catch (err) {
    log(`error finding ${queryType} of character id ${id}`);
    res.status(500).send(err);
  }
});


module.exports = router;
