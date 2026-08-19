import userModel from "../models/UserModel.js";
import { validateRegister } from "../validations/AuthValidation.js";

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