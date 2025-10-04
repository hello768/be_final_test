import mongoose from "mongoose";

const teacherPositionSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: String,
  description: String
});

export default mongoose.model("TeacherPosition", teacherPositionSchema);
