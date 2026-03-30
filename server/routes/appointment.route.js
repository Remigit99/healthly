import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
const router = express.Router();

// Only Doctors can view their clinical queue
router.get('/doctor-queue', protect, authorize('doctor'), (req, res) => {
  res.json({ message: "Welcome to the clinical dashboard, Doctor." });
});

// Parents and Doctors can view medical records, but Admins can too
router.get('/records', protect, authorize('parent', 'doctor', 'admin'), (req, res) => {
  res.json({ message: "Accessing medical records..." });
});

export default router;