import bcrypt from 'bcrypt'; // ma hoa du lieu
import dotenv from 'dotenv';
import { pool } from '../config/database.js';

dotenv.config();

// insert user to database
const createUser = async (userData) => {
    try {
        const { username, password, email, fullName, phone, role = 'user' } = userData;
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds); // mk dc ma hoa

        // tien hanh insert data vao database
        const [result] = await pool.execute(
            'INSERT INTO `users`(`username`,`password`,`email`,`full_name`,`phone`,`role`) VALUES (?,?,?,?,?,?)',
            [username, password, email, fullName, phone, role]
        );
        // tra ve ID cua user vua duoc them moi
        console.log(`ID user inserted ${result.insertId}`);
        const user = await findUserById(result.insertId);
        delete user.password;
        return user;

    } catch (error) {
        console.error("can not insert data : ", error.message);
        return false;
    }
}

const findUserById = async id => {
    const [row] = await pool.execute(
        'SELECT * FROM `users` WHERE `id` = ?',
        [id]
    );
    return row[0] || null;
}
const findUserByUsername = async username => {
    const [row] = await pool.execute(
        'SELECT * FROM `users` WHERE `username` = ?',
        [username]
    );
    return row[0] || null;
}
const findUserByEmail = async email => {
    const [row] = await pool.execute(
        'SELECT * FROM `users` WHERE `email` = ?',
        [email]
    );
    return row[0] || null;
}

const getAllDataUser = async () => {
    const [rows] = await pool.execute(
        'SELECT * FROM `users`'
    );
    return rows || null;
}

const userModel = {
    createUser,
    findUserById,
    findUserByUsername,
    findUserByEmail,
    getAllDataUser
}
export default userModel;