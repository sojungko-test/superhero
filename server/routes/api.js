const express = require('express');

const Character = require('../../models/character');

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
      console.log('err', err);
      res.status(500).send(err);
    } else {
      console.log('chars', chars.length);
      res.status(200).send(chars);
    }
  });
});

router.get('/alignment/:alignment', async (req, res) => {
  const { params: { alignment = '' } } = req;
  Character.find({ biography: { alignment } }, (err, chars) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(chars);
    }
  });
});

router.get('/:id', (req, res) => {
  const { params: { id = '' } } = req;

  Character.find({ id }, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

router.get('/:id/:queryType', (req, res) => {
  const { params: { id = '', queryType = '' } } = req;

  Character.find({ id })
    .select(queryType)
    .exec()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});


module.exports = router;
