import crypto from 'crypto';
import Invitation from '../models/Invitation.js';
import User from '../models/user.model.js';

export const inviteDoctor = async (req, res) => {
  const { email } = req.body;

  // 1. Check if user or invite already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already registered" });

  // 2. Generate a secure token
  const token = crypto.randomBytes(32).toString('hex');

  // 3. Save Invitation
  await Invitation.create({ email, token, role: 'doctor' });

  // 4. Send Email (using Nodemailer or SendGrid)
  // The link would look like: https://healthly.com/setup-profile?token=abc123...
  const inviteLink = `${process.env.FRONTEND_URL}/setup-profile?token=${token}`;
  
  // await sendEmail(email, "Complete your Healthly Doctor Profile", inviteLink);

  res.status(200).json({ message: "Invitation sent successfully" });
};