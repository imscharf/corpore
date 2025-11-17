const express = require('express');
const router = express.Router();
const {
  getAgendamentos,
  getAgendamentoById,
  createAgendamento,
  updateAgendamento,
  deleteAgendamento,
} = require('../controllers/agendamentoController');

router.route('/').get(getAgendamentos).post(createAgendamento);
router.route('/:id').get(getAgendamentoById).put(updateAgendamento).delete(deleteAgendamento);

module.exports = router;