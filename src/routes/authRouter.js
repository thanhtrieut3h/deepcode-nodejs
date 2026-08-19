import express from "express";
import { register } from '../controllers/AuthController.js';

const router = express.Router();
// tao tai khoan
router.post("/register", register);
// http://localhost:5000/api/v1/auth/register

export default router;