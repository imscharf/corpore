const express = require('express');
const router = express.Router();
const {
  getDiagnosticos,
  getDiagnosticoById,
  createDiagnostico,
  updateDiagnostico,
  deleteDiagnostico,
} = require('../controllers/diagnosticoController');

router.route('/').get(getDiagnosticos).post(createDiagnostico);
router.route('/:id').get(getDiagnosticoById).put(updateDiagnostico).delete(deleteDiagnostico);

module.exports = router;