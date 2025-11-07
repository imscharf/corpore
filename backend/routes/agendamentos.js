import express from "express";
import Agendamento from "../models/Agendamento.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const agendamentos = await Agendamento.find();
  res.json(agendamentos);
});

router.post("/", async (req, res) => {
  const novo = new Agendamento(req.body);
  await novo.save();
  res.json(novo);
});

export default router;
