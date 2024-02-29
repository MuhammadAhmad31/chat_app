export interface AuthLoginForm {
  username: string;
  password: string;
}

export interface AuthRegisterForm extends AuthLoginForm {
  name: string;
  id: number;
}

export interface AuthLoginResponse {
  status: number;
  message: string;
  data: {
    id: number;
    name: string;
    username: string;
  };
}

export interface AuthRegisterResponse extends AuthLoginResponse {
  data: {
    id: number;
    name: string;
    username: string;
    password: string;
  };
}
