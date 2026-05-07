import mongoose from "mongoose";

const childSchema = new mongoose.Schema(
  {
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Faster queries when fetching a parent's kids
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    genotype: {
      type: String,
      enum: ["AA", "AS", "SS", "AC", "SC" ,""],
      default: "AA",
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", ""],
    },
    allergies: {
      type: [String],
      default: [],
    },
    medicalHistory: [
      {
        condition: String,
        diagnosedAt: Date,
      },
    ],
  },
  { timestamps: true },
);

const Child = mongoose.model("Child", childSchema);
export default Child;
