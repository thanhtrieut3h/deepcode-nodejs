import express from 'express';
import userRouter from './userRouter.js';
import authRouter from './authRouter.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Test API - API is healthy",
        time: new Date().toISOString()
    });
})

export default router;