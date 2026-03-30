import mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  token: { type: String, required: true }, // Secure random string
  role: { type: String, enum: ['doctor', 'admin'], default: 'doctor' },
  status: { type: String, enum: ['pending', 'accepted'], default: 'pending' },
  expiresAt: { type: Date, default: () => Date.now() + 48 * 60 * 60 * 1000 } // 48 hours
});

const Invitation = mongoose.model('Invitation', invitationSchema);

export default Invitation;