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
  //registry user
  io.on("connection", (socket) => {
    socket.on("f2bGetRegistryUsers", (data) => {
      io.emit("b2fGetRegistryUsers", data);
    });
    socket.on("f2bGetRegistryUser", (data) => {
      console.log(data);
      io.emit("b2fGetRegistryUser", data);
    });
    socket.on("f2bPostRegistryUser", (data) => {
      console.log(data);
      io.emit("b2fPostRegistryUser", data);
    });
    socket.on("f2bPatchRegistryUser", (data) => {
      console.log(data);
      io.emit("b2fPatchRegistryUser", data);
    });
    socket.on("f2bDeleteRegistryUser", (data) => {
      console.log(data);
      io.emit("b2fDeleteRegistryUser", data);
    });
    //confirmed user
    socket.on("f2bGetConfirmedUsers", (data) => {
      io.emit("b2fGetConfirmedUsers", data);
    });
    socket.on("f2bGetConfirmedUser", (data) => {
      console.log(data);
      io.emit("b2fGetConfirmedUser", data);
    });
    socket.on("f2bPostConfirmedUser", (data) => {
      console.log(data);
      io.emit("b2fPostConfirmedUser", data);
    });
    socket.on("f2bPatchConfirmedUser", (data) => {
      console.log(data);
      io.emit("b2fPatchConfirmedUser", data);
    });
    socket.on("f2bDeleteConfirmedUser", (data) => {
      console.log(data);
      io.emit("b2fDeleteConfirmedUser", data);
    });

    //attendance User
    socket.on("f2bGetAttendanceUsers", (data) => {
      io.emit("b2fGetAttendanceUsers", data);
    });
    socket.on("f2bGetAttendanceUser", (data) => {
      io.emit("b2fGetAttendanceUser", data);
    });
    socket.on("f2bPostAttendanceUser", (data) => {
      io.emit("b2fPostAttendanceUser", data);
    });

    //attendance User
    socket.on("f2bGetAttendanceUserDefSchedules", (data) => {
      io.emit("b2fGetAttendanceUserDefSchedules", data);
    });
    socket.on("f2bf2bGetAttendanceUserDefSchedule", (data) => {
      io.emit("b2ff2bGetAttendanceUserDefSchedule", data);
    });
    socket.on("f2bPostAttendanceUserDefSchedule", (data) => {
      io.emit("b2fPostAttendanceUserDefSchedule", data);
    });
    socket.on("f2bPatchAttendanceUserDefSchedule", (data) => {
      io.emit("b2fPatchAttendanceUserDefSchedule", data);
    });
  });
}
