import { login, register } from "@/api/auth";
import { useToast } from "@/components/ui/use-toast";
import {
  AuthLoginForm,
  AuthLoginResponse,
  AuthRegisterForm,
  AuthRegisterResponse,
} from "@/types/auth.type";
import { ResponseApiError } from "@/types/responseApi.type";
import { ToastAction } from "@radix-ui/react-toast";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useLogin = () => {
  const { toast } = useToast();

  const { mutate, isLoading, isSuccess } = useMutation(
    (payload: AuthLoginForm) => {
      return login(payload);
    },
    {
      onSuccess: (response) => {
        const data = response.data as AuthLoginResponse;

        Cookies.set("id", String(data.data.id));

        if (data) {
          window.location.href = "/chat";
        }
      },
      onError: ({ response }) => {
        const { message } = response.data as ResponseApiError;

        toast({
          variant: "destructive",
          title: "Gagal",
          description: `${message}`,
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      },
    }
  );

  return {
    login: mutate,
    isLoading,
    isSuccess,
  };
};

export const useRegister = () => {
  const { toast } = useToast();

  const { mutate, isLoading, isSuccess } = useMutation(
    (payload: AuthRegisterForm) => {
      return register(payload);
    },
    {
      onSuccess: (response) => {
        const data = response.data as AuthRegisterResponse;

        toast({
          variant: "success",
          title: "Berhasil",
          description: `${data.message}`,
        });

        if (data) {
          window.location.href = "/login";
        }
      },
      onError: ({ response }) => {
        const { message } = response.data as ResponseApiError;

        toast({
          variant: "destructive",
          title: "Gagal",
          description: `${message}`,
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      },
    }
  );

  return {
    register: mutate,
    isLoading,
    isSuccess,
  };
};
