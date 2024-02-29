type Member = number;

export type Chat = {
  [x: string]: any;
  id: number;
  members: Member[];
  created_at: string;
  updated_at: string;
};

export type ChatForm = {
  id: number;
  firstId: number;
  secondId: number;
};

export type ResponseChatForm = {
  status: number;
  message: string;
  data: {
    id: number;
    members: number[];
  };
};
