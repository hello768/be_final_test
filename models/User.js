const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, sparse: true },
  phoneNumber: String,
  address: String,
  identity: String,
  dob: Date,
  isDeleted: { type: Boolean, default: false },
  role: { type: String, enum: ['STUDENT','TEACHER','ADMIN'], default: 'TEACHER' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
