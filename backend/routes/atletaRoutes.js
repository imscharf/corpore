const express = require('express');
const router = express.Router();
const {
  getAtletas,
  getAtletaById,
  createAtleta,
  updateAtleta,
  deleteAtleta,
} = require('../controllers/atletaController');

router.route('/').get(getAtletas).post(createAtleta);
router.route('/:id').get(getAtletaById).put(updateAtleta).delete(deleteAtleta);

module.exports = router;