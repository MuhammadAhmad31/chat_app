import { Message } from "../types/message.type";
const dbPool = require("../config/database");

export const createMessage = async (body: Message) => {
    const insertMessageQuery = 'INSERT INTO Message (chatId, senderId, text) VALUES (?, ?, ?)';
    const values = [body.chatId, body.senderId, body.text];
  
    try {
      const [rows] = await dbPool.execute(insertMessageQuery, values);
      return rows.insertId;
    } catch (err) {
      throw err;
    }
  };

  export const getAllMessagesByChatId = async (chatId: number) => {
    const getAllMessagesQuery = 'SELECT * FROM Message WHERE chatId = ?';
    const values = [chatId];
  
    try {
      const [rows] = await dbPool.execute(getAllMessagesQuery, values);
      return rows;
    } catch (err) {
      throw err;
    }
  };