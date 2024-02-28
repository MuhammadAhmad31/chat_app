import { Request, Response } from "express";

export const getChat = (req: Request, res: Response) => {
  res.send("Hello World");
};