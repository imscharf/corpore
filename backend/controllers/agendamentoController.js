const Agendamento = require('../models/Agendamento');

// @desc    Get all agendamentos
// @route   GET /api/agendamentos
// @access  Public
const getAgendamentos = async (req, res) => {
  try {
    const agendamentos = await Agendamento.find({})
      .populate('atleta', 'nome cpf email')
      .populate('fisioterapeuta', 'nome crefito');
    res.json(agendamentos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get agendamento by ID
// @route   GET /api/agendamentos/:id
// @access  Public
const getAgendamentoById = async (req, res) => {
  try {
    const agendamento = await Agendamento.findById(req.params.id)
      .populate('atleta', 'nome cpf email')
      .populate('fisioterapeuta', 'nome crefito');
    if (agendamento) {
      res.json(agendamento);
    } else {
      res.status(404).json({ message: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new agendamento
// @route   POST /api/agendamentos
// @access  Public
const createAgendamento = async (req, res) => {
  const { atleta, fisioterapeuta, dataConsulta, horarioConsulta, tipoConsulta, observacoes } = req.body;

  try {
    const newAgendamento = new Agendamento({
      atleta,
      fisioterapeuta,
      dataConsulta,
      horarioConsulta,
      tipoConsulta,
      observacoes,
    });

    const createdAgendamento = await newAgendamento.save();
    res.status(201).json(createdAgendamento);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an agendamento
// @route   PUT /api/agendamentos/:id
// @access  Public
const updateAgendamento = async (req, res) => {
  const { atleta, fisioterapeuta, dataConsulta, horarioConsulta, tipoConsulta, observacoes } = req.body;

  try {
    const foundAgendamento = await Agendamento.findById(req.params.id);

    if (foundAgendamento) {
      foundAgendamento.atleta = atleta || foundAgendamento.atleta;
      foundAgendamento.fisioterapeuta = fisioterapeuta || foundAgendamento.fisioterapeuta;
      foundAgendamento.dataConsulta = dataConsulta || foundAgendamento.dataConsulta;
      foundAgendamento.horarioConsulta = horarioConsulta || foundAgendamento.horarioConsulta;
      foundAgendamento.tipoConsulta = tipoConsulta || foundAgendamento.tipoConsulta;
      foundAgendamento.observacoes = observacoes || foundAgendamento.observacoes;

      const updatedAgendamento = await foundAgendamento.save();
      res.json(updatedAgendamento);
    } else {
      res.status(404).json({ message: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an agendamento
// @route   DELETE /api/agendamentos/:id
// @access  Public
const deleteAgendamento = async (req, res) => {
  try {
    const foundAgendamento = await Agendamento.findById(req.params.id);

    if (foundAgendamento) {
      await foundAgendamento.deleteOne();
      res.json({ message: 'Agendamento removido' });
    } else {
      res.status(404).json({ message: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAgendamentos,
  getAgendamentoById,
  createAgendamento,
  updateAgendamento,
  deleteAgendamento,
};