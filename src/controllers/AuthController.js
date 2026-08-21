import userModel from "../models/UserModel.js";
import { validateRegister, validateLogin } from "../validations/AuthValidation.js";
import { generateToken } from "../services/jwtService.js";

export const register = async (req, res, next) => {
    try {
        // can kiem tra tinh hop le cua du lieu gui len
        // cac du lieu do nam trong req.body (gui len bang method POST)
        // req.query (gui bang me thod GET)
        const { isValid, errors } = validateRegister(req.body);
        if(!isValid){
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors
            });
        }
        // kiem tra username da dc tao cho tai khoan nao chua ?
        const checkUsername = await userModel.findUserByUsername(req.body.username);
        if(checkUsername){
            return res.status(409).json({
                success: false,
                message: "username already exists"
            });
        }
        // kiem tra email da duoc tao cho tai khoan nao chua ?
        const checkEmail = await userModel.findUserByEmail(req.body.email);
        if(checkEmail){
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        // tao tai khoan
        const user = await userModel.createUser(req.body);
        // loi khong tao duoc
        if(!user){
            return res.status(500).json({
                success: false,
                message: "Can not create user"
            });
        }
        // thanh cong
        return res.status(201).json({
            success: true,
            message: "user registered successfully",
            data: {
                user
            }
        });
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        // validate login
        const { isValid, errors } = validateLogin(req.body); // dung method post de truy cap
        if(!isValid){
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors
            });
        }
        // find user
        const user = await userModel.findUserByUsername(req.body.username);
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Account invalid"
            });
        }
        // kiem tra mat khau
        const checkPassword = await userModel.verifyPassword(req.body.password, user.password);
        if(!checkPassword){
            return res.status(401).json({
                success: false,
                message: "Account invalid"
            });
        }
        // cap nhat lai cot "last_login" trong database
        await userModel.updateLastLogin(user.id);
        // delete password
        delete user.password;
        // ma hoa token chua thong tin nguoi dung vua dang nhap
        const token = generateToken({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        });

        return res.status(200).json({
            success: true,
            message: "login successful",
            data: {
                user,
                token
            }
        });

    } catch (error) {
        next(error)
    }
}

export const getCurrentUser = (req, res, next) => {
    try {
        const user = userModel.findUserById(req.user.id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
}