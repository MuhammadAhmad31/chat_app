import { Request, Response } from 'express';
import { Chat } from '../types/chat.type';
import { create, findChat, getUserChat } from '../models/chatModel';
import { handleErrorResponse, handleSuccessResponse } from '../utils/ResponseHandler';

export const createChatController = async (req: Request, res: Response) => {
  try {
    const { id, firstId, secondId } = req.body;
    
    const newChat: Chat = {
      id,
      members: [firstId, secondId]
    };

    const chatId = await create(newChat);

    const response = {
      id: chatId,
      members: newChat.members.map(Number)
    };

    handleSuccessResponse(res, 'Create chat success', response, 201);
  } catch (error: any) {
    handleErrorResponse(res, 'Create chat failed', error.message, 500);
  }
};

export const getUserChatController = async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.userId, 10);
    const userChats = await getUserChat(userId);

    handleSuccessResponse<Chat[]>(res, 'Get user chats success', userChats, 200);
  } catch (error: any) {
    handleErrorResponse<string>(res, 'Get user chats failed', error.message, 500);
  }
};

export const findChatController = async (req: Request, res: Response) => {
  try {
    const member1: number = parseInt(req.params.member1, 10);
    const member2: number = parseInt(req.params.member2, 10);
    const chat = await findChat(member1, member2);

    if (chat) {
      handleSuccessResponse<Chat>(res, 'Find chat success', chat, 200);
    } else {
      handleErrorResponse<string>(res, 'Chat not found', 'Chat not found', 404);
    }
  } catch (error: any) {
    handleErrorResponse<string>(res, 'Find chat failed', error.message, 500);
  }
};


