import express from "express";
import Teacher from "../models/Teacher.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Teacher.countDocuments();
    const teachers = await Teacher.find().skip(skip).limit(limit);

    res.json({
      data: teachers,
      pagination: {
        total,
        page,
        limit
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let code;
    let exists = true;
    while (exists) {
      code = Math.floor(100000 + Math.random() * 900000).toString();
      exists = await Teacher.exists({ code });
    }

    const newTeacher = new Teacher({
      ...req.body,
      code
    });

    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
