export interface ResponseApi<TData> {
    message: string;
    data: TData;
}
export interface ResponseApiError {
    message: string;
    errors?: any;
}

export interface ResponseApiSuccess {
    message: string;
    
}