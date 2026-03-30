import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true, maxlength: 50, minlength: 2 },
  lastName: { type: String, required: true, trim: true, maxlength: 50, minlength: 2 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /^\S+@\S+\.\S+$/ },
  password: { type: String, required: true, minlength: 6, },
  role: { 
    type: String, 
    enum: ['parent', 'doctor', 'admin'], 
    default: 'parent' 
  },
  phoneNumber: String,
  avatar: String,
  
  // Role-Specific Data
  doctorProfile: {
    specialization: String,
    licenseNumber: String,
    hospitalAffiliation: String,
    isVerified: { type: Boolean, default: false }, 
    bio: String,
    availability: [{ day: String, slots: [String] }]
  },

  // Metadata
  isActive: { type: Boolean, default: true },
  lastLogin: Date,

  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  verificationTokenExpires: Date,

  // refreshTokens
  refreshTokens: [
    {
      token: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      expiresAt: { type: Date, required: true },
      deviceInfo: String, 
    }
  ],


}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;    