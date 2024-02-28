import { Response } from "express";

interface CustomResponse<TError, TData> {
  message: string;
  error?: TError;
  data?: TData;
  status: number;
}

export const handleErrorResponse = <TError>(
  res: Response,
  message: string,
  error: TError,
  status: number
): void => {
  const response: CustomResponse<TError, undefined> = {
    status: status,
    message: message,
    error: error,
  };
  res.status(status).json(response);
};

export const handleSuccessResponse = <TData>(
  res: Response,
  message: string,
  data: TData,
  status: number
): void => {
  const response: CustomResponse<undefined, TData> = {
    status: status,
    message: message,
    data: data,
  };
  res.status(status).json(response);
};
