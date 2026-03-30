import { Router } from "express";
import { registerUser, login, verifyEmail } from "../controller/user.controller.js";


const router = Router()

// REGISTER USER ENDPOINT
router.post("/register", registerUser);

// LOGIN USER ENDPOINT
router.post("/login", login);

// VERIFY EMAIL ENDPOINT
 router.get("/verify-email", verifyEmail);


export default router
