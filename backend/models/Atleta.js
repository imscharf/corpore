import mongoose from "mongoose";

const atletaSchema = new mongoose.Schema({
  nome: String,
  cpf: String,
  telefone: String,
  email: String,
  dataNascimento: String,
});

export default mongoose.model("Atleta", atletaSchema);