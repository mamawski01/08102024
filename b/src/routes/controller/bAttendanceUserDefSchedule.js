import AttendanceUserDefScheduleModel from "./models/AttendanceUserDefScheduleModel.js";
import ConfirmedUserModel from "./models/ConfirmedUserModel.js";
import { getter, patcher, poster } from "./operators/bOperators.js";

export function bGetAttendanceUserDefSchedules(req, res) {
  console.log("connected");
  getter(
    req,
    res,
    "simple/findAll",
    AttendanceUserDefScheduleModel,
    "bGetAttendanceUserDefSchedules"
  );
}

export function bGetAttendanceUserDefSchedule(req, res) {
  console.log("connected");
  getter(
    req,
    res,
    "simple/findOne",
    AttendanceUserDefScheduleModel,
    "bGetAttendanceUserDefSchedule"
  );
}

export function bPostAttendanceUserDefSchedule(req, res) {
  console.log("connected");
  poster(
    req,
    res,
    "bPostAttendanceUserDefSchedule",
    AttendanceUserDefScheduleModel,
    "bPostAttendanceUserDefSchedule",
    null,
    null,
    ConfirmedUserModel
  );
}

export function bPatchAttendanceUserDefSchedule(req, res) {
  console.log("connected");
  patcher(
    req,
    res,
    "simple",
    AttendanceUserDefScheduleModel,
    "bPatchAttendanceUserDefSchedule"
  );
}
