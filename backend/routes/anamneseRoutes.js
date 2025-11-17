const express = require('express');
const router = express.Router();
const {
  getAnamneses,
  getAnamneseById,
  createAnamnese,
  updateAnamnese,
  deleteAnamnese,
} = require('../controllers/anamneseController');

router.route('/').get(getAnamneses).post(createAnamnese);
router.route('/:id').get(getAnamneseById).put(updateAnamnese).delete(deleteAnamnese);

module.exports = router;