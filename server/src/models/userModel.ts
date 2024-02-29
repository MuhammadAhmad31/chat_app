import bcrypt from 'bcrypt';
import { User, UserRegister } from '../types/user.type';
const dbPool = require("../config/database");

export const RegisterModel = async (body: UserRegister) => {
    const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
    const insertUserQuery = 'INSERT INTO users (id, name, username, password) VALUES (?, ?, ?, ?)';

    const [existingUser] = await dbPool.execute(checkUsernameQuery, [body.username]);

    if (existingUser.length > 0) {
        throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const values = [body.id, body.name, body.username, hashedPassword];

    try {
        const [rows] = await dbPool.execute(insertUserQuery, values);
        return rows;
    } catch (err) {
        throw err;
    }
}

export const loginModel = async (username: string, password: string) => {
    const sqlQuery = 'SELECT * FROM users WHERE username = ?';
    const values = [username];

    try {
        const [rows] = await dbPool.execute(sqlQuery, values);
        if (rows.length === 0) {
            throw new Error("Username not found");
        }

        const user = rows[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            throw new Error("Password is incorrect");
        }

        return user;
    } catch (err) {
        throw err;
    }
}

export const findOne = async (id: string) => {
    const sqlQuery = 'SELECT * FROM users WHERE id = ?';
    const values = [id];

    try {
        const [rows] = await dbPool.execute(sqlQuery, values);

        if (rows.length === 0) {
            throw new Error(`User with ID ${id} not found`);
        }

        return rows[0];
    } catch (err) {
        throw err;
    }
};

export const findAll = async () => {
    const sqlQuery = 'SELECT * FROM users';

    try {
        const [rows] = await dbPool.execute(sqlQuery);
        return rows;
    } catch (err) {
        throw err;
    }
}