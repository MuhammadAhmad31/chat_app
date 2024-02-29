import { Request, Response } from 'express';
import { handleErrorResponse, handleSuccessResponse } from '../utils/ResponseHandler';
import { createMessage, getAllMessagesByChatId } from '../models/messageModel';
import { findChatWithId } from '../models/chatModel';
import { Message } from '../types/message.type';

export const createMessageController = async (req: Request, res: Response) => {
  try {
    const newMessage = req.body;

    const chat = await findChatWithId(newMessage.chatId);

    if (!chat || !chat.members.includes(newMessage.senderId)) {
      handleErrorResponse<string>(res, 'Invalid chatId or senderId', 'Invalid chatId or senderId', 400);
      return;
    }

    const messageId = await createMessage(newMessage);

    const createdMessage = { id: messageId, senderId: newMessage.senderId, chatId: newMessage.chatId, text: newMessage.text };

    handleSuccessResponse<Message>(res, 'Create message success', createdMessage, 201);
  } catch (error: any) {
    handleErrorResponse<string>(res, 'Create message failed', error.message, 500);
  }
};

export const getAllMessagesController = async (req: Request, res: Response) => {
    try {
      const chatId: number = parseInt(req.params.chatId, 10);
      const messages = await getAllMessagesByChatId(chatId);
  
      handleSuccessResponse<any[]>(res, 'Get all messages success', messages, 200);
    } catch (error: any) {
      handleErrorResponse<string>(res, 'Get all messages failed', error.message, 500);
    }
  };
