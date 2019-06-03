const express = require('express');
const Debug = require('debug');
const Character = require('../../models/character');

const log = Debug('server:routes:api');
const router = express.Router();

// all paths are relative to /api
router.get('/search/:q', async (req, res) => {
  const { params: { q = '' }, query: { alignment = '' } } = req;
  Character.find({
    name: {
      $regex: new RegExp(q, 'i'),
    },
    'biography.alignment': alignment,
  }, (err, chars) => {
    if (err) {
      log('error finding character', err);
      res.status(500).send(err);
    } else {
      log(`found ${chars.length} characters`);
      res.status(200).send(chars);
    }
  });
});

// TODO validate alignment
router.get('/alignment/:alignment', async (req, res) => {
  const { params: { alignment = '' } } = req;
  Character.find({
    'biography.alignment': alignment,
  }, (err, chars) => {
    if (err) {
      log('error finding characters based on alignment', err);
      res.status(500).send(err);
    } else {
      log(`found ${alignment} characters`);
      console.log('chars', chars);
      res.status(200).send(chars);
    }
  });
});

// TODO validate id
router.get('/:id', (req, res) => {
  const { params: { id = '' } } = req;

  Character.findOne({ id }, (err, result) => {
    if (err) {
      log('error finding character based on id', err);
      res.status(500).send(err);
    } else {
      log(`found character of id ${id}`);
      res.status(200).send(result);
    }
  });
});

// TODO validate id, queryType
router.get('/:id/:queryType', (req, res) => {
  const { params: { id = '', queryType = '' } } = req;

  Character.find({ id })
    .select(queryType)
    .exec()
    .then((result) => {
      log(`found the ${queryType} of character id ${id}`);
      res.status(200).send(result);
    })
    .catch((err) => {
      log(`error finding ${queryType} of character id ${id}`);
      res.status(500).send(err);
    });
});


module.exports = router;
