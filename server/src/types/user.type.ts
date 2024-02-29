export type UserRegister = {
    id: number;
    name: string;
    username: string;
    password: string;
}

export type UserLogin = {
    id: number;
    username: string;
    password?: string;
    name: string;
}

export type User = {
    id?: number;
    name: string;
    username?: string;
}