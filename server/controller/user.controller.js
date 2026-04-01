import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokens } from '../utils/generateTokens.js';

import sendEmail from "../utils/sendEmail.js";
import { verificationEmailTemplate } from "../utils/emailTemplate.js";
import crypto from "crypto";


// REGISTER USER CONTROLLER
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

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

// LOGIN USER CONTROLLER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Identity Check: Does the email exist in Healthly?
    const user = await User.findOne({ email }).select('+password'); 
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //  Integrity Check: Does the password match?
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //  THE BLOCKER: Verification Status Enforcement
    // Stop the process here if the email hasn't been confirmed.
    if (!user.isVerified) {
      return res.status(403).json({ 
        message: "Account not verified. Please check your email to activate your account.",
        errorCode: "EMAIL_NOT_VERIFIED", // Specific code for Frontend logic
        email: user.email // Helpful if we want to auto-fill a 'Resend' form
      });
    }

    // 4. Session Creation: Issue the Token Pair
    const { accessToken, refreshToken } = generateTokens(user);

    // 5. Multi-Device Storage: Push the new refresh token to the array
    user.refreshTokens.push({
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 Days
    });
    
    // Clean up: Optional logic to remove expired tokens from the array
    user.refreshTokens = user.refreshTokens.filter(rt => rt.expiresAt > Date.now());
    
    await user.save();

    // 6. Secure Cookie Placement
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // 7. Success Response
    res.status(200).json({
      accessToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        role: user.role, // Critical for React Router v7 "Faces"
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// LOGOUT USER CONTROLLER
export const logout = async (req, res) => {

  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(204); // No content

  const refreshToken = cookies.refreshToken;

  //  Remove the specific refresh token from the User's array in DB
  await User.findOneAndUpdate(
    { "refreshTokens.token": refreshToken },
    { $pull: { refreshTokens: { token: refreshToken } } }
  );

  //  Clear the cookie from the browser
  res.clearCookie('refreshToken', { 
    httpOnly: true, 
    sameSite: 'Strict', 
    secure: process.env.NODE_ENV === 'production' 
  });
  
  res.status(200).json({ message: "Logged out successfully" });
};

// VERIFY EMAIL CONTROLLER
export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  const user = await User.findOne({ 
    verificationToken: token,
    verificationTokenExpires: { $gt: Date.now() } 
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired verification link." });
  }

  user.isVerified = true;
  user.verificationToken = undefined; // Clear the token
  user.verificationTokenExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Email verified! You can now log in." });
};


// REFRESH TOKEN CONTROLLER
export const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.status(401).json({ message: "No refresh token" });

  const refreshToken = cookies.refreshToken;

  //  Find the user who owns this specific refresh token
  const foundUser = await User.findOne({ "refreshTokens.token": refreshToken });
  if (!foundUser) return res.status(403).json({ message: "Invalid refresh token" });

  //  Verify the token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser._id.toString() !== decoded.id) {
      return res.status(403).json({ message: "Token expired or altered" });
    }

    //  Generate a fresh Access Token
    const accessToken = jwt.sign(
      { id: foundUser._id, role: foundUser.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    // Send back the new access token + user info for the UI
    res.json({ accessToken, role: foundUser.role, firstName: foundUser.firstName });
  });
};