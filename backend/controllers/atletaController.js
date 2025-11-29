const Atleta = require('../models/Atleta');

// @desc    Get all atletas
const getAtletas = async (req, res) => {
  try {
    const atletas = await Atleta.find({});
    res.json(atletas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get atleta by ID
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
const createAtleta = async (req, res) => {
  const {
    nome, sexo, dataNascimento, endereco, equipe, uf, rg, cpf, peso, altura,
    email, telefone, horasTreinamento, inicioCarreira, 
    historicoLesoes, // Agora espera um array
    tratamentosRealizados // Agora espera um array
  } = req.body;

  try {
    const atleta = new Atleta({
      nome, sexo, dataNascimento, endereco, equipe, uf, rg, cpf, peso, altura,
      email, telefone, horasTreinamento, inicioCarreira, 
      historicoLesoes, 
      tratamentosRealizados
    });

    const createdAtleta = await atleta.save();
    res.status(201).json(createdAtleta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an atleta
const updateAtleta = async (req, res) => {
  const {
    nome, sexo, dataNascimento, endereco, equipe, uf, rg, cpf, peso, altura,
    email, telefone, horasTreinamento, inicioCarreira, 
    historicoLesoes, 
    tratamentosRealizados
  } = req.body;

  try {
    const atleta = await Atleta.findById(req.params.id);

    if (atleta) {
      atleta.nome = nome || atleta.nome;
      atleta.sexo = sexo || atleta.sexo;
      atleta.dataNascimento = dataNascimento || atleta.dataNascimento;
      atleta.endereco = endereco || atleta.endereco;
      atleta.equipe = equipe || atleta.equipe;
      atleta.uf = uf || atleta.uf;
      atleta.rg = rg || atleta.rg;
      atleta.cpf = cpf || atleta.cpf;
      atleta.peso = peso || atleta.peso;
      atleta.altura = altura || atleta.altura;
      atleta.email = email || atleta.email;
      atleta.telefone = telefone || atleta.telefone;
      atleta.horasTreinamento = horasTreinamento || atleta.horasTreinamento;
      atleta.inicioCarreira = inicioCarreira || atleta.inicioCarreira;
      
      // Atualiza arrays se forem passados
      if (historicoLesoes) atleta.historicoLesoes = historicoLesoes;
      if (tratamentosRealizados) atleta.tratamentosRealizados = tratamentosRealizados;

      const updatedAtleta = await atleta.save();
      res.json(updatedAtleta);
    } else {
      res.status(404).json({ message: 'Atleta não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an atleta
const deleteAtleta = async (req, res) => {
  try {
    const atleta = await Atleta.findById(req.params.id);
    if (atleta) {
      await atleta.deleteOne();
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