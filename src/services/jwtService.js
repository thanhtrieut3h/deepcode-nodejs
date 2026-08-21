import jwt from 'jsonwebtoken';
import dotevn from 'dotenv';

dotevn.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const JWT_EXPIRE = process.env.JWT_EXPIRE;

// tao token
export const generateToken = (payload) => {
    // payload : du lieu can ma hoa thanh token
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
}
// tao moi lai token
export const generateRefreshToken = (payload) => {
    return jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: '30d'}
    );
}
// xac thuc token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
}
// giai ma thong tin trong token
export const decodeToken = (token) => {
    return jwt.decode(token);
}