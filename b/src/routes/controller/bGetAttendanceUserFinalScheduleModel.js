import AttendanceUserFinalSchedule from "./models/AttendanceUserFinalScheduleModel.js";
import { getter, poster } from "./operators/bOperators.js";

export function bGetAttendanceUserFinalScheduleModels(req, res) {
  console.log("lol");
  getter(
    req,
    res,
    "simple/findAll",
    AttendanceUserFinalSchedule,
    "bGetAttendanceUserFinalScheduleModel"
  );
}

export function bPostAttendanceUserFinalScheduleModel(req, res) {
  console.log("lol");
  poster(
    req,
    res,
    "bPostAttendanceUserFinalScheduleModel",
    AttendanceUserFinalSchedule,
    "bPostAttendanceUserFinalScheduleModel",
    null
  );
}
