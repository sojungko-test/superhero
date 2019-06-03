const express = require('express');

const { queryCharacter } = require('../controllers/search-controller');
const { getAlignment } = require('../controllers/alignment-controller');
const {
  getCharacterById,
  getCharacterDetail,
} = require('../controllers/id-controller');

const router = express.Router();

// all paths are relative to /api
router.get('/search/:q', queryCharacter);

// TODO validate alignment
router.get('/alignment/:alignment', getAlignment);

// TODO validate id, detailType
router.get('/:id', getCharacterById);
router.get('/:id/:detailType', getCharacterDetail);


module.exports = router;
