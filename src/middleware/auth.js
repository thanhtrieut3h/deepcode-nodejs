import { verifyToken } from '../services/jwtService.js';

export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; // lay dc token gui qua headers
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }
        const token = authHeader.split(" ")[1];
        // xac thuc token
        const verify = verifyToken(token);
        req.user = {
            id: verify.id,
            username: verify.username,
            email: verify.email,
            role: verify.role
        };
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
}