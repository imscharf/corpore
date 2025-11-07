import express from "express";
import Fisioterapeuta from "../models/Fisioterapeuta.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const fisios = await Fisioterapeuta.find();
  res.json(fisios);
});

router.post("/", async (req, res) => {
  const novo = new Fisioterapeuta(req.body);
  await novo.save();
  res.json(novo);
});

export default router;
