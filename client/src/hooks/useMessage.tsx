import { messageByIdChat, sendMessage } from "@/api/message";
import { toast, useToast } from "@/components/ui/use-toast";
import { CreateMessageResponse, MessageForm } from "@/types/message.type";
import { ResponseApiError } from "@/types/responseApi.type";
import { ToastAction } from "@radix-ui/react-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";

export const useGetMessageByIdChat = (id: number, socket: any) => {
  const { data, isLoading, isError, error, refetch } = useQuery(
    ["chats", id],
    () => {
      return messageByIdChat(id!);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      refetchInterval: 1,
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
  }, [isError]);

  return {
    data: {
      chats: res?.data,
      message: res?.message,
    },
    isLoading,
    isError,
    error,
    refetch,
  };
};

export const useSendMessage = () => {
  const { toast } = useToast();

  const { mutate, isLoading, isSuccess } = useMutation(
    (payload: MessageForm) => {
      return sendMessage(payload);
    },
    {
      onSuccess: (response) => {
        const data = response.data as CreateMessageResponse;

        // toast({
        //   variant: "success",
        //   title: "Berhasil",
        //   description: `${data.message}`,
        // });
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
    addMessage: mutate,
    isLoading,
    isSuccess,
  };
};
