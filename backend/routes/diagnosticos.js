import express from "express";
import Diagnostico from "../models/Diagnostico.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const diagnosticos = await Diagnostico.find();
  res.json(diagnosticos);
});

router.post("/", async (req, res) => {
  const novo = new Diagnostico(req.body);
  await novo.save();
  res.json(novo);
});

export default router;
