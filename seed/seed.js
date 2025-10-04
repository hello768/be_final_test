import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Teacher from "../models/Teacher.js";
import TeacherPosition from "../models/TeacherPosition.js";
import connectDB from "../config/db.js";

dotenv.config();
await connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const teachersData = JSON.parse(fs.readFileSync(path.join(__dirname, "school.teachers.json")));
const positionsData = JSON.parse(fs.readFileSync(path.join(__dirname, "school.teacherpositions.json")));

const importData = async () => {
  try {
    await Teacher.deleteMany();
    await TeacherPosition.deleteMany();

    await Teacher.insertMany(teachersData);
    await TeacherPosition.insertMany(positionsData);

    console.log("✅ Seed data imported");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding:", error);
    process.exit(1);
  }
};

importData();
