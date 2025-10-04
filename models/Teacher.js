import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  status: Boolean,
  address: String,
  position: String,
  education: {
    level: String,
    school: String
  }
});

export default mongoose.model("Teacher", teacherSchema);
