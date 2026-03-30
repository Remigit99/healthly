import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokens } from '../utils/generateTokens.js';

import sendEmail from "../utils/sendEmail.js";
import { verificationEmailTemplate } from "../utils/emailTemplate.js";
import crypto from "crypto";

// REGISTER USER CONTROLLER

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    //  Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  Create Verification Token
  const vToken = crypto.randomBytes(32).toString('hex');

    //  Create User (Doctor profile is null by default for parents)
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken: vToken,
      verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    });

     // Generate Tokens
    const { accessToken, refreshToken } = generateTokens(newUser);

    //  Save Refresh Token to DB (for rotation/security)
    newUser.refreshTokens.push({
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    await newUser.save();

    //  Set Refresh Token in httpOnly Cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // SEND THE EMAIL
    try {
      await sendEmail({
        email: newUser.email,
        subject: "Verify your Healthly Account",
        html: verificationEmailTemplate(newUser.firstName, vToken)
      });
    } catch (mailError) {
      console.error("Email failed to send:", mailError);
 
    }

    res.status(201).json({ accessToken, role: newUser.role, firstName: newUser.firstName });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};