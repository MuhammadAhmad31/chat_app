// controllers/userController.ts
import { Request, Response } from "express";
import { RegisterModel, findAll, findOne, loginModel } from "../models/userModel";
import { handleErrorResponse, handleSuccessResponse } from "../utils/ResponseHandler";
import { User, UserLogin, UserRegister } from "../types/user.type";

export const RegisterController = async (req: Request, res: Response) => {
    const { body } = req;

    if (!body.id || !body.name || !body.username || !body.password) {
        handleErrorResponse(res, "Invalid input", "Invalid input", 400);
        return;
    }

    try {
        const data: UserRegister = body;
        await RegisterModel(data);
        handleSuccessResponse<UserRegister>(res, "Register users success", data, 201);
    } catch (error: any) {
        if (error.message === "Username already exists") {
            handleErrorResponse(res, "Username already exists", "Username already exists", 400);
        } else {
            handleErrorResponse<string>(res, "Register users failed", error.message, 500);
        }
    }
};

export const LoginController = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        handleErrorResponse(res, "Invalid input", "Invalid input", 400);
        return;
    }

    try {
        const user: UserLogin = await loginModel(username, password);

        const userDataWithPassword = {
            id : user.id,
            username: user.username,
            name: user.name
        }

        handleSuccessResponse<UserLogin>(res, "Login success", userDataWithPassword, 200);
    } catch (error: any) {
        if (error.message === "Username not found" || error.message === "Password is incorrect") {
            handleErrorResponse<string>(res, "Invalid username or password", "Invalid username or password", 400);
        } else {
            handleErrorResponse<string>(res, "Login failed", error.message, 500);
        }
    }
};

export const getUserByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        handleErrorResponse(res, "Invalid input", "Invalid input", 400);
        return;
    }

    try { 
        const user = await findOne(id);

        const data = {
            name: user.name
        }

        handleSuccessResponse<User>(res, "Get user by id success", data, 200);
    } catch (error: any) {
        if (error.message.includes("not found")) {
            handleErrorResponse(res, "User not found", `User with ID ${id} not found`, 404);
        } else {
            handleErrorResponse<string>(res, "Get user by id failed", error.message, 500);
        }
    }
};

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users: User[] = await findAll();

        const data = users.map(user => ({
            id: user.id,
            username: user.username,
            name: user.name,
        }));

        handleSuccessResponse<User[]>(res, "Get all users success", data, 200);
    } catch (error: any) {
        handleErrorResponse<string>(res, "Get all users failed", error.message, 500);
    }
}