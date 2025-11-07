import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import atletaRoutes from "./routes/atletas.js";
import fisioRoutes from "./routes/fisios.js";
import diagnosticoRoutes from "./routes/diagnosticos.js";
import agendamentoRoutes from "./routes/agendamentos.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/atletas", atletaRoutes);
app.use("/api/fisios", fisioRoutes);
app.use("/api/diagnosticos", diagnosticoRoutes);
app.use("/api/agendamentos", agendamentoRoutes);

// Conexão com MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.log("❌ Erro MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));