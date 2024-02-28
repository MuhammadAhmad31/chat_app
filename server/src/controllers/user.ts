// controllers/userController.ts
import { Request, Response } from "express";
import { RegisterModel } from "../models/userModel";
import { handleErrorResponse, handleSuccessResponse } from "../utils/ResponseHandler";
import { User } from "../types/user.type";

export const Register = async (req: Request, res: Response) => {
    const { body } = req;

    if (!body.id || !body.name || !body.username || !body.password) {
        handleErrorResponse(res, "Invalid input", "Invalid input", 400);
        return;
    }

    try {
        await RegisterModel(body);
        handleSuccessResponse<User>(res, "Register users success", body, 201);
    } catch (error: any) {
        if (error.message === "Username already exists") {
            handleErrorResponse(res, "Username already exists", "Username already exists", 400);
        } else {
            handleErrorResponse<string>(res, "Register users failed", error.message, 500);
        }
    }
};
