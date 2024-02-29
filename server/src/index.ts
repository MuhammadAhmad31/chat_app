const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
import { Request, Response } from "express";
import chatRoute = require("./routes/chat");
import userRoute = require("./routes/user");
import messageRoute = require("./routes/message");
import { handleErrorResponse } from "./utils/ResponseHandler";

const app = express();
const server = http.createServer(app);
const io = socketIO(server); // Create a Socket.IO server instance

const cors = require('cors');
require("dotenv").config();

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use('/api', chatRoute);
app.use('/api', userRoute);
app.use('/api', messageRoute);

// Socket.IO handling
io.on("connection", (socket: any) => {
  console.log("A user connected");

  // Listen for incoming messages
  socket.on("message", (message: any) => {
    // Broadcast the message to all connected clients
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// 404 Not Found handler
app.use((req: Request, res: Response, err: any) => {
  handleErrorResponse(res, "Not Found", "Not Found", 404);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
