const { Server } = require("socket.io");
const io = new Server({ cors: "http://localhost:3000" });

io.on("connection", (socket) => {

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
  });

  socket.on("sendMessage", (message) => {
    io.to(message.chatId).emit("newMessage", message);
    console.log(message);
  });
});

io.listen(8000);
