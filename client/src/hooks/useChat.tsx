import { createChat, findChatByIdUser } from "@/api/chat";
import { toast, useToast } from "@/components/ui/use-toast";
import { ChatForm, ResponseChatForm } from "@/types/chat.type";
import { ResponseApiError } from "@/types/responseApi.type";
import { ToastAction } from "@radix-ui/react-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";

export const useGetChatByIdUser = (id: number) => {
  const { data, isLoading, isError, error } = useQuery(
    ["chats", id],
    () => {
      return findChatByIdUser(id!);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const err = error as AxiosError<ResponseApiError>;
  const res = data?.data;
  const message = err?.response?.data?.message;

  const notif = () => {
    toast({
      variant: "destructive",
      title: "Gagal mengambil data",
      description: `${message || "Terjadi Error"}`,
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  };

  useEffect(() => {
    if (isError) {
      notif();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return {
    data: {
      chats: res?.data,
      message: res?.message,
    },
    isLoading,
    error,
  };
};

export const useCreateChat = () => {
  const { toast } = useToast();

  const { mutate, isLoading, isSuccess } = useMutation(
    (payload: ChatForm) => {
      return createChat(payload);
    },
    {
      onSuccess: (response) => {
        const data = response.data as ResponseChatForm;

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
    addChat: mutate,
    isLoading,
    isSuccess,
  };
};
