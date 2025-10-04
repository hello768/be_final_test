import express from "express";
import TeacherPosition from "../models/TeacherPosition.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const positions = await TeacherPosition.find();
    res.json(positions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { code, name, description } = req.body;

    const exists = await TeacherPosition.exists({ code });
    if (exists) return res.status(400).json({ message: "Code already exists" });

    const newPos = new TeacherPosition({ code, name, description });
    await newPos.save();
    res.status(201).json(newPos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
