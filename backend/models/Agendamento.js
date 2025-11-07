import mongoose from "mongoose";

const agendamentoSchema = new mongoose.Schema({
  atletaId: { type: mongoose.Schema.Types.ObjectId, ref: "Atleta" },
  fisioId: { type: mongoose.Schema.Types.ObjectId, ref: "Fisioterapeuta" },
  data: String,
  horario: String,
  observacao: String,
});

export default mongoose.model("Agendamento", agendamentoSchema);