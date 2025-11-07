import mongoose from "mongoose";

const diagnosticoSchema = new mongoose.Schema({
  atletaId: { type: mongoose.Schema.Types.ObjectId, ref: "Atleta" },
  descricao: String,
  laudoDigitalizado: String, // URL ou base64
  data: { type: Date, default: Date.now },
});

export default mongoose.model("Diagnostico", diagnosticoSchema);