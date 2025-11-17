const Exame = require('../models/Exame');

// @desc    Get all exames
// @route   GET /api/exames
// @access  Public
const getExames = async (req, res) => {
  try {
    const exames = await Exame.find({})
      .populate('atleta', 'nome')
      .populate('fisioterapeuta', 'nome');
    res.json(exames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get exame by ID
// @route   GET /api/exames/:id
// @access  Public
const getExameById = async (req, res) => {
  try {
    const exame = await Exame.findById(req.params.id)
      .populate('atleta', 'nome sexo dataNascimento equipe uf rg cpf peso altura email telefone horasTreinamento inicioCarreira historicoLesoes tratamentosRealizados')
      .populate('fisioterapeuta', 'nome');
    if (exame) {
      res.json(exame);
    } else {
      res.status(404).json({ message: 'Exame não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new exame
// @route   POST /api/exames
// @access  Public
const createExame = async (req, res) => {
  const { atleta, fisioterapeuta, tipoExame, dataExame, status, resultado, laudoLiberado } = req.body;

  try {
    const newExame = new Exame({
      atleta,
      fisioterapeuta,
      tipoExame,
      dataExame,
      status,
      resultado,
      laudoLiberado,
    });

    const createdExame = await newExame.save();
    res.status(201).json(createdExame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an exame
// @route   PUT /api/exames/:id
// @access  Public
const updateExame = async (req, res) => {
  const { atleta, fisioterapeuta, tipoExame, dataExame, status, resultado, laudoLiberado } = req.body;

  try {
    const foundExame = await Exame.findById(req.params.id);

    if (foundExame) {
      foundExame.atleta = atleta || foundExame.atleta;
      foundExame.fisioterapeuta = fisioterapeuta || foundExame.fisioterapeuta;
      foundExame.tipoExame = tipoExame || foundExame.tipoExame;
      foundExame.dataExame = dataExame || foundExame.dataExame;
      foundExame.status = status || foundExame.status;
      foundExame.resultado = resultado || foundExame.resultado;
      foundExame.laudoLiberado = laudoLiberado !== undefined ? laudoLiberado : foundExame.laudoLiberado;

      const updatedExame = await foundExame.save();
      res.json(updatedExame);
    } else {
      res.status(404).json({ message: 'Exame não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an exame
// @route   DELETE /api/exames/:id
// @access  Public
const deleteExame = async (req, res) => {
  try {
    const foundExame = await Exame.findById(req.params.id);

    if (foundExame) {
      await foundExame.deleteOne();
      res.json({ message: 'Exame removido' });
    } else {
      res.status(404).json({ message: 'Exame não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getExames,
  getExameById,
  createExame,
  updateExame,
  deleteExame,
};