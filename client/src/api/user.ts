import { axiosInstance } from "@/lib/axiosInstance"
import axios, { AxiosError } from "axios";

export const findAll = async () => {
    try {
        const response = await axiosInstance.get('/users');
        return response
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw err as AxiosError
        }
        throw err;
    }
}

export const findOne = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/user/${id}`);
        return response
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw err as AxiosError
        }
        throw err;
    }
}