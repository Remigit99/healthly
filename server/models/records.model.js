import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  child: { type: mongoose.Schema.Types.ObjectId, ref: 'Child', required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: String }, // Or ref to Doctor model
  diagnosis: String,
  treatment: String,
  files: [String], // URLs to PDFs/Images of lab results
  visitDate: { type: Date, default: Date.now }
});

export const Record = mongoose.model('Record', recordSchema);
