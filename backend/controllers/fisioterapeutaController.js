const Fisioterapeuta = require('../models/Fisioterapeuta');

// @desc    Get all fisioterapeutas
// @route   GET /api/fisioterapeutas
// @access  Public
const getFisioterapeutas = async (req, res) => {
  try {
    const fisioterapeutas = await Fisioterapeuta.find({});
    res.json(fisioterapeutas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get fisioterapeuta by ID
// @route   GET /api/fisioterapeutas/:id
// @access  Public
const getFisioterapeutaById = async (req, res) => {
  try {
    const fisioterapeuta = await Fisioterapeuta.findById(req.params.id);
    if (fisioterapeuta) {
      res.json(fisioterapeuta);
    } else {
      res.status(404).json({ message: 'Fisioterapeuta não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new fisioterapeuta
// @route   POST /api/fisioterapeutas
// @access  Public
const createFisioterapeuta = async (req, res) => {
  const {
    nome, sexo, dataNascimento, equipe, uf, rg, cpf, email, telefone, crefito,
  } = req.body;

  try {
    const fisioterapeuta = new Fisioterapeuta({
      nome, sexo, dataNascimento, equipe, uf, rg, cpf, email, telefone, crefito,
    });

    const createdFisioterapeuta = await fisioterapeuta.save();
    res.status(201).json(createdFisioterapeuta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a fisioterapeuta
// @route   PUT /api/fisioterapeutas/:id
// @access  Public
const updateFisioterapeuta = async (req, res) => {
  const {
    nome, sexo, dataNascimento, equipe, uf, rg, cpf, email, telefone, crefito,
  } = req.body;

  try {
    const fisioterapeuta = await Fisioterapeuta.findById(req.params.id);

    if (fisioterapeuta) {
      fisioterapeuta.nome = nome || fisioterapeuta.nome;
      fisioterapeuta.sexo = sexo || fisioterapeuta.sexo;
      fisioterapeuta.dataNascimento = dataNascimento || fisioterapeuta.dataNascimento;
      fisioterapeuta.equipe = equipe || fisioterapeuta.equipe;
      fisioterapeuta.uf = uf || fisioterapeuta.uf;
      fisioterapeuta.rg = rg || fisioterapeuta.rg;
      fisioterapeuta.cpf = cpf || fisioterapeuta.cpf;
      fisioterapeuta.email = email || fisioterapeuta.email;
      fisioterapeuta.telefone = telefone || fisioterapeuta.telefone;
      fisioterapeuta.crefito = crefito || fisioterapeuta.crefito;

      const updatedFisioterapeuta = await fisioterapeuta.save();
      res.json(updatedFisioterapeuta);
    } else {
      res.status(404).json({ message: 'Fisioterapeuta não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a fisioterapeuta
// @route   DELETE /api/fisioterapeutas/:id
// @access  Public
const deleteFisioterapeuta = async (req, res) => {
  try {
    const fisioterapeuta = await Fisioterapeuta.findById(req.params.id);

    if (fisioterapeuta) {
      await fisioterapeuta.deleteOne();
      res.json({ message: 'Fisioterapeuta removido' });
    } else {
      res.status(404).json({ message: 'Fisioterapeuta não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFisioterapeutas,
  getFisioterapeutaById,
  createFisioterapeuta,
  updateFisioterapeuta,
  deleteFisioterapeuta,
};