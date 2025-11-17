const mongoose = require('mongoose');

const fisioterapeutaSchema = mongoose.Schema({
  nome: { type: String, required: true },
  sexo: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  equipe: { type: String },
  uf: { type: String },
  rg: { type: String },
  cpf: { type: String, unique: true, required: true },
  peso: { type: Number }, // Não aplicável ao fisioterapeuta, mas mantido para consistência se o dirigente cadastrar
  altura: { type: Number }, // Não aplicável ao fisioterapeuta
  email: { type: String, unique: true, required: true },
  telefone: { type: String },
  crefito: { type: String, unique: true, required: true }, // Específico para fisioterapeuta
});

const Fisioterapeuta = mongoose.model('Fisioterapeuta', fisioterapeutaSchema);

module.exports = Fisioterapeuta;