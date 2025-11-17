const mongoose = require('mongoose');

const exameSchema = mongoose.Schema({
  atleta: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Atleta',
  },
  fisioterapeuta: { // Quem solicitou/realizou o exame
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Fisioterapeuta',
  },
  tipoExame: { type: String, required: true }, // Ex: Raio-x, Ultrassom, Tomografia
  dataExame: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['Concluído', 'Em Andamento', 'Liberado'],
    default: 'Em Andamento',
  },
  resultado: { type: String }, // Caminho para o PDF ou URL do laudo
  laudoLiberado: { type: Boolean, default: false },
});

const Exame = mongoose.model('Exame', exameSchema);

module.exports = Exame;