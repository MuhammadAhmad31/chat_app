import { Chat } from "../types/chat.type";
const dbPool = require("../config/database");

export const create = async (body: Chat) => {
    const insertChatQuery = 'INSERT INTO Chat (members) VALUES (?)';
    const values = [JSON.stringify(body.members)];
  
    try {
      const [rows] = await dbPool.execute(insertChatQuery, values);
      return rows.insertId;
    } catch (err) {
      throw err;
    }
};
  

export const getUserChat = async (userId: number) => {
    const getUserChatQuery = 'SELECT * FROM Chat WHERE members LIKE ?';
    const value = `%${userId}%`;
  
    try {
      const [rows] = await dbPool.execute(getUserChatQuery, [value]);
      return rows;
    } catch (err) {
      throw err;
    }
  };
  
  
  export const findChat = async (member1: number, member2: number) => {
    const findChatQuery = 'SELECT * FROM Chat WHERE (members LIKE ? AND members LIKE ?) OR (members LIKE ? AND members LIKE ?)';
    const values = [`%${member1}%`, `%${member2}%`, `%${member2}%`, `%${member1}%`];
  
    try {
      const [rows] = await dbPool.execute(findChatQuery, values);
      return rows[0];
    } catch (err) {
      throw err;
    }
  };

  export const findChatWithId = async(id: number) => {
    const findChatQuery = 'SELECT * FROM Chat WHERE id = ?';
  
    try {
      const [rows] = await dbPool.execute(findChatQuery, [id]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
  
  