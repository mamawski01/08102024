import { Server } from "socket.io";

export function socketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const events = [
    //registryUser//
    { f2b: "f2bGetRegistryUsers", b2f: "b2fGetRegistryUsers" },
    { f2b: "f2bGetRegistryUser", b2f: "b2fGetRegistryUser" },
    { f2b: "f2bPostRegistryUser", b2f: "b2fPostRegistryUser" },
    { f2b: "f2bPatchRegistryUser", b2f: "b2fPatchRegistryUser" },
    { f2b: "f2bDeleteRegistryUser", b2f: "b2fDeleteRegistryUser" },
    //registryUser//
    //confirmedUser//
    { f2b: "f2bGetConfirmedUsers", b2f: "b2fGetConfirmedUsers" },
    { f2b: "f2bGetConfirmedUser", b2f: "b2fGetConfirmedUser" },
    { f2b: "f2bPostConfirmedUser", b2f: "b2fPostConfirmedUser" },
    { f2b: "f2bPatchConfirmedUser", b2f: "b2fPatchConfirmedUser" },
    { f2b: "f2bDeleteConfirmedUser", b2f: "b2fDeleteConfirmedUser" },
    //confirmedUser//
    //attendance User
    { f2b: "f2bGetAttendanceUsers", b2f: "b2fGetAttendanceUsers" },
    { f2b: "f2bGetAttendanceUser", b2f: "b2fGetAttendanceUser" },
    { f2b: "f2bPostAttendanceUser", b2f: "b2fPostAttendanceUser" },
    { f2b: "f2bDeleteAttendanceUsers", b2f: "b2fDeleteAttendanceUsers" },
    //attendance User
    //attendanceUserDefSchedule
    {
      f2b: "f2bGetAttendanceUserDefSchedules",
      b2f: "b2fGetAttendanceUserDefSchedules",
    },
    {
      f2b: "f2bGetAttendanceUserDefSchedule",
      b2f: "b2fGetAttendanceUserDefSchedule",
    },
    {
      f2b: "f2bPostAttendanceUserDefSchedule",
      b2f: "b2fPostAttendanceUserDefSchedule",
    },
    {
      f2b: "f2bPatchAttendanceUserDefSchedule",
      b2f: "b2fPatchAttendanceUserDefSchedule",
    },
    //attendanceUserDefSchedule
    //attendanceUserFinalSchedules
    {
      f2b: "f2bGetAttendanceUserFinalSchedules",
      b2f: "b2fGetAttendanceUserFinalSchedules",
    },
    {
      f2b: "f2bGetAttendanceUserFinalSchedule",
      b2f: "b2fGetAttendanceUserFinalSchedule",
    },
    {
      f2b: "f2bPostAttendanceUserFinalSchedule",
      b2f: "b2fPostAttendanceUserFinalSchedule",
    },
    {
      f2b: "f2bPatchAttendanceUserFinalSchedule",
      b2f: "b2fPatchAttendanceUserFinalSchedule",
    },
    {
      f2b: "f2bDeleteAttendanceUserFinalSchedules",
      b2f: "b2fDeleteAttendanceUserFinalSchedules",
    },
    //attendanceUserFinalSchedules
  ];

  io.on("connection", (socket) => {
    events.forEach(({ f2b, b2f }) => {
      socket.on(f2b, (data) => {
        io.emit(b2f, data);
      });
    });
  });
}
