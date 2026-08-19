import express from 'express';
import { getAllUser } from '../controllers/UserController.js';

const router = express.Router();

router.get('/all-user', getAllUser);

export default router;