const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patientID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: Number,
  gender: String,
  contactInfo: {
    phone: String,
    email: String,
    address: String
  },
  allergies: [String],
  medicalHistory: [String],
  currentPrescriptions: [String],
  doctorNotes: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', patientSchema);
