import express from "express";
import { register, login, getCurrentUser } from '../controllers/AuthController.js';
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// tao tai khoan
router.post("/register", register);
// http://localhost:5000/api/v1/auth/register

// dang nhap
router.post("/login", login);
// http://localhost:5000/api/v1/auth/login

// bao ve cac router :  authenticate cai bao ve khong cho truy cap bat hop phap
router.get("/me", authenticate, getCurrentUser);
// http://localhost:5000/api/v1/auth/me

export default router;