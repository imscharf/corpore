const express = require('express');
const router = express.Router();
const {
  getFisioterapeutas,
  getFisioterapeutaById,
  createFisioterapeuta,
  updateFisioterapeuta,
  deleteFisioterapeuta,
} = require('../controllers/fisioterapeutaController');

router.route('/').get(getFisioterapeutas).post(createFisioterapeuta);
router.route('/:id').get(getFisioterapeutaById).put(updateFisioterapeuta).delete(deleteFisioterapeuta);

module.exports = router;