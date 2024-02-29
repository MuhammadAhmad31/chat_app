import { findAll, findOne } from "@/api/user";
import { toast, useToast } from "@/components/ui/use-toast";
import { ResponseApiError } from "@/types/responseApi.type";
import { ToastAction } from "@radix-ui/react-toast";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";

export const useGetUser = () => {
  const { data, isLoading, isError, error } = useQuery(
    ["users"],
    () => {
      return findAll();
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
      users: res?.data,
      message: res?.message,
    },
    isLoading,
    error,
  };
};

export const useGetOneUser = (id: number) => {
  const { toast } = useToast();

  const { data, isLoading, isError, error } = useQuery(
    ["story", id],
    () => {
      return findOne(id!);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!id,
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
      user: res?.data,
      message: res?.message,
    },
    isLoading,
    error,
  };
};
