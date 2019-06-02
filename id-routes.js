const express = require('express');

const router = express.Router();
const Character = require('./models/character');

// all paths are relative to /:id
router.get('/', (req, res) => {
  const { params: { id = '' } } = req;

  Character.find({ id }, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

router.get('/:queryType', (req, res) => {
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
