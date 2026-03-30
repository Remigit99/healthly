import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";

const router = Router()

// REGISTER USER ENDPOINT
router.post("/register", registerUser)


export default router
