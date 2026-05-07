import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  child:  { type: mongoose.Schema.Types.ObjectId, ref: 'Child', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assigned later
  appointmentDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  type: { type: String, enum: ['Physical', 'Virtual'], default: 'Physical' },
  reason: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);