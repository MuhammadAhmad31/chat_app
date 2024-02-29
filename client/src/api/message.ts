import { axiosInstance } from "@/lib/axiosInstance";
import axios, { AxiosError } from "axios";

export const messageByIdChat = async (chatId: number) => {
    try {
        const response = await axiosInstance.get(`/messages/${chatId}`);
        return response
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw err as AxiosError
        }
        throw err;
    }
}

export const sendMessage = async (payload: { chatId: number, senderId: number, text: string }) => {
    try {
        const response = await axiosInstance.post(`/messages`, payload);
        return response
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw err as AxiosError
        }
        throw err;
    }
}