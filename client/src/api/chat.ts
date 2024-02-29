import { axiosInstance } from "@/lib/axiosInstance";
import { Chat, ChatForm } from "@/types/chat.type";
import axios, { AxiosError } from "axios";

export const findChatByIdUser = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/chats/${id}`);
        return response
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw err as AxiosError
        }
        throw err;
    }
}

export const createChat = async (payload: ChatForm) => {
    try {
        const response = await axiosInstance.post('/chats', payload);
        return response
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw err as AxiosError
        }
        throw err;
    }
}