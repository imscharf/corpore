const Atleta = require('../models/Atleta');

// @desc    Get all atletas
// @route   GET /api/atletas
// @access  Public (for now)
const getAtletas = async (req, res) => {
  try {
    const atletas = await Atleta.find({});
    res.json(atletas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get atleta by ID
// @route   GET /api/atletas/:id
// @access  Public
const getAtletaById = async (req, res) => {
  try {
    const atleta = await Atleta.findById(req.params.id);
    if (atleta) {
      res.json(atleta);
    } else {
      res.status(404).json({ message: 'Atleta not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new atleta
// @route   POST /api/atletas
// @access  Public
const createAtleta = async (req, res) => {
  const {
    nome, sexo, dataNascimento, equipe, uf, rg, cpf, peso, altura,
    email, telefone, horasTreinamento, inicioCarreira, historicoLesoes,
    tratamentosRealizados
  } = req.body;

  try {
    const atleta = new Atleta({
      nome, sexo, dataNascimento, equipe, uf, rg, cpf, peso, altura,
      email, telefone, horasTreinamento, inicioCarreira, historicoLesoes,
      tratamentosRealizados
    });

    const createdAtleta = await atleta.save();
    res.status(201).json(createdAtAtleta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an atleta
// @route   PUT /api/atletas/:id
// @access  Public
const updateAtleta = async (req, res) => {
  const {
    nome, sexo, dataNascimento, equipe, uf, rg, cpf, peso, altura,
    email, telefone, horasTreinamento, inicioCarreira, historicoLesoes,
    tratamentosRealizados
  } = req.body;

  try {
    const atleta = await Atleta.findById(req.params.id);

    if (atleta) {
      atleta.nome = nome || atleta.nome;
      atleta.sexo = sexo || atleta.sexo;
      atleta.dataNascimento = dataNascimento || atleta.dataNascimento;
      atleta.equipe = equipe || atleta.equipe;
      atleta.uf = uf || atleta.uf;
      atleta.rg = rg || atleta.rg;
      atleta.cpf = cpf || atleta.cpf;
      atleta.peso = peso || atleta.peso;
      atleta.peso = altura || atleta.altura;
      atleta.email = email || atleta.email;
      atleta.telefone = telefone || atleta.telefone;
      atleta.horasTreinamento = horasTreinamento || atleta.horasTreinamento;
      atleta.inicioCarreira = inicioCarreira || atleta.inicioCarreira;
      atleta.historicoLesoes = historicoLesoes || atleta.historicoLesoes;
      atleta.tratamentosRealizados = tratamentosRealizados || atleta.tratamentosRealizados;

      const updatedAtleta = await atleta.save();
      res.json(updatedAtleta);
    } else {
      res.status(404).json({ message: 'Atleta not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an atleta
// @route   DELETE /api/atletas/:id
// @access  Public
const deleteAtleta = async (req, res) => {
  try {
    const atleta = await Atleta.findById(req.params.id);

    if (atleta) {
      await atleta.deleteOne(); // Use deleteOne for Mongoose 6+
      res.json({ message: 'Atleta removed' });
    } else {
      res.status(404).json({ message: 'Atleta not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAtletas,
  getAtletaById,
  createAtleta,
  updateAtleta,
  deleteAtleta,
};