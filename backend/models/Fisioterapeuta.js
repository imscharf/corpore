import mongoose from "mongoose";

const fisioSchema = new mongoose.Schema({
  nome: String,
  registro: String,
  telefone: String,
  email: String,
});

export default mongoose.model("Fisioterapeuta", fisioSchema);