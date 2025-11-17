const Diagnostico = require('../models/Diagnostico');

// @desc    Get all diagnosticos
// @route   GET /api/diagnosticos
// @access  Public
const getDiagnosticos = async (req, res) => {
  try {
    const diagnosticos = await Diagnostico.find({});
    res.json(diagnosticos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get diagnostico by ID
// @route   GET /api/diagnosticos/:id
// @access  Public
const getDiagnosticoById = async (req, res) => {
  try {
    const diagnostico = await Diagnostico.findById(req.params.id);
    if (diagnostico) {
      res.json(diagnostico);
    } else {
      res.status(404).json({ message: 'Diagnóstico não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new diagnostico
// @route   POST /api/diagnosticos
// @access  Public
const createDiagnostico = async (req, res) => {
  const { diagnostico, descricao, planoTratamento } = req.body;

  try {
    const newDiagnostico = new Diagnostico({
      diagnostico,
      descricao,
      planoTratamento,
    });

    const createdDiagnostico = await newDiagnostico.save();
    res.status(201).json(createdDiagnostico);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a diagnostico
// @route   PUT /api/diagnosticos/:id
// @access  Public
const updateDiagnostico = async (req, res) => {
  const { diagnostico, descricao, planoTratamento } = req.body;

  try {
    const foundDiagnostico = await Diagnostico.findById(req.params.id);

    if (foundDiagnostico) {
      foundDiagnostico.diagnostico = diagnostico || foundDiagnostico.diagnostico;
      foundDiagnostico.descricao = descricao || foundDiagnostico.descricao;
      foundDiagnostico.planoTratamento = planoTratamento || foundDiagnostico.planoTratamento;

      const updatedDiagnostico = await foundDiagnostico.save();
      res.json(updatedDiagnostico);
    } else {
      res.status(404).json({ message: 'Diagnóstico não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a diagnostico
// @route   DELETE /api/diagnosticos/:id
// @access  Public
const deleteDiagnostico = async (req, res) => {
  try {
    const foundDiagnostico = await Diagnostico.findById(req.params.id);

    if (foundDiagnostico) {
      await foundDiagnostico.deleteOne();
      res.json({ message: 'Diagnóstico removido' });
    } else {
      res.status(404).json({ message: 'Diagnóstico não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDiagnosticos,
  getDiagnosticoById,
  createDiagnostico,
  updateDiagnostico,
  deleteDiagnostico,
};