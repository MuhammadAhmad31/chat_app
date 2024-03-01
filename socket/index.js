const { Server } = require("socket.io");
const http = require("http"); 

const server = http.createServer(); 
const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  socket.on("message", (message) => {
    io.emit("receive", message);
  });

});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
