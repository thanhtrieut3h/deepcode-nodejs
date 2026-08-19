import userModel from "../models/UserModel.js";

export const getAllUser = async (req, res, next) => {
    try {
        const users = await userModel.getAllDataUser();
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
}