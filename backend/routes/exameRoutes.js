const express = require('express');
const router = express.Router();
const {
  getExames,
  getExameById,
  createExame,
  updateExame,
  deleteExame,
} = require('../controllers/exameController');

router.route('/').get(getExames).post(createExame);
router.route('/:id').get(getExameById).put(updateExame).delete(deleteExame);

module.exports = router;