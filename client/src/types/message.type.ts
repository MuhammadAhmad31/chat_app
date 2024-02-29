export type ChatMessage = {
  id: number;
  chatId: number;
  senderId: number;
  text: string;
  created_at: string;
  updated_at: string;
};

export type MessageForm = {
  chatId: number;
  senderId: number;
  text: string;
};

interface ChatMessageForm {
  id: number;
  senderId: number;
  chatId: number;
  text: string;
}

// Define the CreateMessageResponse type
export interface CreateMessageResponse {
  status: number;
  message: string;
  data: ChatMessage;
}
