import { Server } from "socket.io";

let io;

export function registerSocketServer(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  //second happening then, sending data to FE
  io.on("connection", (socket) => {
    socket.on("f2bGetRegistryUsers", (data) => {
      io.emit("b2fGetRegistryUsers", data);
    });
    socket.on("f2bGetRegistryUser", (data) => {
      console.log(data);
      io.emit("b2fGetRegistryUser", data);
    });
  });
}
