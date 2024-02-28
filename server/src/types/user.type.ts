export type UserRegister = {
    id: number;
    name: string;
    username: string;
    password: string;
}

export type UserLogin = {
    username: string;
    password?: string;
    name: string;
}

export type User = {
    name: string;
    username?: string;
}