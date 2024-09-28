import { getter, patcher, poster } from "./api";

export function getAttendanceUserDefSchedules(fIO) {
  return getter(
    "simple/findAll",
    "/bGetAttendanceUserDefSchedules",
    "getAttendanceUserDefSchedules",
    fIO,
  );
}

export function getAttendanceUserDefSchedule(fIO, id) {
  return getter(
    "simple/findOne",
    "/bGetAttendanceUserDefSchedule/",
    "getAttendanceUserDefSchedule",
    fIO,
    id,
  );
}

export function postAttendanceUserDefSchedule(fIO, data, confirmedUserId) {
  return poster(
    "postAttendanceUserDefSchedule",
    "/bPostAttendanceUserDefSchedule/",
    "postAttendanceUserDefSchedule",
    fIO,
    data,
    null,
    confirmedUserId,
  );
}

export function patchAttendanceUserDefSchedule(fIO, id, data) {
  return patcher(
    "simple/updateOne",
    "/bPatchAttendanceUserDefSchedule/",
    "patchAttendanceUserDefSchedule",
    fIO,
    id,
    data,
  );
}
