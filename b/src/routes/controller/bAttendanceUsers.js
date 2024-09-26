import AttendanceUserModel from "./models/AttendanceUserModel.js";

import { deleter, getter, poster } from "./operators/bOperators.js";

export function bGetAttendanceUsers(req, res) {
  getter(
    req,
    res,
    "simple/findAll",
    AttendanceUserModel,
    "bGetAttendanceUsers"
  );
}

export function bGetAttendanceUser(req, res) {
  getter(req, res, "findArray", AttendanceUserModel, "bGetAttendanceUser");
}

export function bPostAttendanceUser(req, res) {
  poster(
    req,
    res,
    "bPostAttendanceUser",
    AttendanceUserModel,
    "bPostAttendanceUser",
    null
  );
}

export function bDeleteAttendanceUsers(req, res) {
  deleter(
    req,
    res,
    "simple/deleteMany",
    AttendanceUserModel,
    "bDeleteAttendanceUsers"
  );
}
