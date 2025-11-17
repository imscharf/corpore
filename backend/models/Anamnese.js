const mongoose = require('mongoose');

const anamneseSchema = mongoose.Schema({
  atleta: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Atleta',
  },
  fisioterapeuta: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Fisioterapeuta',
  },
  dataConsulta: { type: Date, required: true },
  descricao: { type: String, required: true },
});

const Anamnese = mongoose.model('Anamnese', anamneseSchema);

module.exports = Anamnese;