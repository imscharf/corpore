const mongoose = require('mongoose');

const diagnosticoSchema = mongoose.Schema({
  diagnostico: { type: String, required: true, unique: true }, // Nome do diagnóstico
  descricao: { type: String, required: true },
  planoTratamento: { type: String, required: true },
});

const Diagnostico = mongoose.model('Diagnostico', diagnosticoSchema);

module.exports = Diagnostico;