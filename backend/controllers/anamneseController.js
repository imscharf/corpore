const Anamnese = require('../models/Anamnese');

// @desc    Get all anamneses
// @route   GET /api/anamneses
// @access  Public
const getAnamneses = async (req, res) => {
  try {
    const anamneses = await Anamnese.find({})
      .populate('atleta', 'nome') // Popula o nome do atleta
      .populate('fisioterapeuta', 'nome'); // Popula o nome do fisioterapeuta
    res.json(anamneses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get anamnese by ID
// @route   GET /api/anamneses/:id
// @access  Public
const getAnamneseById = async (req, res) => {
  try {
    const anamnese = await Anamnese.findById(req.params.id)
      .populate('atleta', 'nome')
      .populate('fisioterapeuta', 'nome');
    if (anamnese) {
      res.json(anamnese);
    } else {
      res.status(404).json({ message: 'Anamnese não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new anamnese
// @route   POST /api/anamneses
// @access  Public
const createAnamnese = async (req, res) => {
  const { atleta, fisioterapeuta, dataConsulta, descricao } = req.body;

  try {
    const newAnamnese = new Anamnese({
      atleta,
      fisioterapeuta,
      dataConsulta,
      descricao,
    });

    const createdAnamnese = await newAnamnese.save();
    res.status(201).json(createdAnamnese);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an anamnese
// @route   PUT /api/anamneses/:id
// @access  Public
const updateAnamnese = async (req, res) => {
  const { atleta, fisioterapeuta, dataConsulta, descricao } = req.body;

  try {
    const foundAnamnese = await Anamnese.findById(req.params.id);

    if (foundAnamnese) {
      foundAnamnese.atleta = atleta || foundAnamnese.atleta;
      foundAnamnese.fisioterapeuta = fisioterapeuta || foundAnamnese.fisioterapeuta;
      foundAnamnese.dataConsulta = dataConsulta || foundAnamnese.dataConsulta;
      foundAnamnese.descricao = descricao || foundAnamnese.descricao;

      const updatedAnamnese = await foundAnamnese.save();
      res.json(updatedAnamnese);
    } else {
      res.status(404).json({ message: 'Anamnese não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an anamnese
// @route   DELETE /api/anamneses/:id
// @access  Public
const deleteAnamnese = async (req, res) => {
  try {
    const foundAnamnese = await Anamnese.findById(req.params.id);

    if (foundAnamnese) {
      await foundAnamnese.deleteOne();
      res.json({ message: 'Anamnese removida' });
    } else {
      res.status(404).json({ message: 'Anamnese não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAnamneses,
  getAnamneseById,
  createAnamnese,
  updateAnamnese,
  deleteAnamnese,
};