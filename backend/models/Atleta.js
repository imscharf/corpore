const mongoose = require('mongoose');

const atletaSchema = mongoose.Schema({
  nome: { type: String, required: true },
  sexo: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  endereco: { type: String },
  equipe: { type: String },
  uf: { type: String },
  rg: { type: String },
  cpf: { type: String, unique: true, required: true },
  peso: { type: Number },
  altura: { type: Number },
  email: { type: String, unique: true, required: true },
  telefone: { type: String },
  horasTreinamento: { type: Number },
  inicioCarreira: { type: Date },
  
  // Alterado de String para Array de Objetos
  historicoLesoes: [{
    tipo: String,
    dataLesao: Date,
    gravidade: String, // Ex: Leve, Moderada, Grave
    descricao: String
  }],
  
  // Alterado de String para Array de Objetos
  tratamentosRealizados: [{
    tipo: String,
    dataInicio: Date,
    dataFim: Date,
    descricao: String
  }]
});

const Atleta = mongoose.model('Atleta', atletaSchema);

module.exports = Atleta;