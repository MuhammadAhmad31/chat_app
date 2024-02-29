import axios, { Axios, AxiosError } from "axios";
import { axiosInstance } from "../lib/axiosInstance";
import { AuthLoginForm, AuthRegisterForm } from "@/types/auth.type";

export const login = async (payload: AuthLoginForm) => {
  try {
    const response = await axiosInstance.post("/login", payload);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError;
    }
    throw error;
  }
};

export const register = async (payload: AuthRegisterForm) => {
  try {
    const response = await axiosInstance.post("/register", payload);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError;
    }
    throw error;
  }
}