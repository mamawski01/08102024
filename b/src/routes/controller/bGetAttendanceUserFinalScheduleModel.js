import AttendanceUserFinalSchedule from "./models/AttendanceUserFinalScheduleModel.js";
import { deleter, getter, patcher, poster } from "./operators/bOperators.js";

export function bGetAttendanceUserFinalSchedules(req, res) {
  getter(
    req,
    res,
    "simple/findAll",
    AttendanceUserFinalSchedule,
    "bGetAttendanceUserFinalSchedules"
  );
}

export function bGetAttendanceUserFinalSchedule(req, res) {
  getter(
    req,
    res,
    "simple/findOne",
    AttendanceUserFinalSchedule,
    "bGetAttendanceUserFinalSchedule"
  );
}

// export function bGetAttendanceUserFinalScheduleArr(req, res) {
//   getter(
//     req,
//     res,
//     "findArray",
//     AttendanceUserFinalSchedule,
//     "bGetAttendanceUserFinalScheduleArr"
//   );
// }

export function bPostAttendanceUserFinalSchedule(req, res) {
  poster(
    req,
    res,
    "bPostAttendanceUserFinalSchedule",
    AttendanceUserFinalSchedule,
    "bPostAttendanceUserFinalSchedule",
    null
  );
}

export function bPatchAttendanceUserFinalSchedule(req, res) {
  patcher(
    req,
    res,
    "simple",
    AttendanceUserFinalSchedule,
    "bPatchAttendanceUserFinalSchedule"
  );
}

export function bDeleteAttendanceUserFinalSchedules(req, res) {
  deleter(
    req,
    res,
    "simple/deleteMany",
    AttendanceUserFinalSchedule,
    "bDeleteAttendanceUserFinalSchedules"
  );
}
