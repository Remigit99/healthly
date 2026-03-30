import mongoose from "mongoose";

const childSchema = new mongoose.Schema({
  parentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  bloodGroup: String,
  genotype: String,
  allergies: [String],
  medicalHistory: [{
    condition: String,
    diagnosedAt: Date
  }],
}, { timestamps: true });

const Child = mongoose.model("Child", childSchema);
export default Child;