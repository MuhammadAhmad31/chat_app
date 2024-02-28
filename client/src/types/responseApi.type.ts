export interface ResponseApiError {
  message: string;
  status: string;
  errors?: any;
}

export interface ResponseApiSuccess<TData> {
  status: number;
  message: string;
  data: TData;
}
