const mongoose = require('mongoose');

const agendamentoSchema = mongoose.Schema({
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
  horarioConsulta: { type: String, required: true }, // Ex: "09:00", "14:30"
  tipoConsulta: { type: String, required: true }, // Ex: "Avaliação", "Retorno", "Terapia"
  observacoes: { type: String },
});

const Agendamento = mongoose.model('Agendamento', agendamentoSchema);

module.exports = Agendamento;