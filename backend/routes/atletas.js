import express from "express";
import Atleta from "../models/Atleta.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const atletas = await Atleta.find();
  res.json(atletas);
});

router.post("/", async (req, res) => {
  const novo = new Atleta(req.body);
  await novo.save();
  res.json(novo);
});

export default router;