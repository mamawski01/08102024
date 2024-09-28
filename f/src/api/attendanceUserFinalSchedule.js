import { deleter, getter, patcher, poster } from "./api";

export function getAttendanceUserFinalSchedules(fIO) {
  return getter(
    "simple/findAll",
    "/bGetAttendanceUserFinalSchedules",
    "bGetAttendanceUserFinalSchedules",
    fIO,
  );
}

export function getAttendanceUserFinalSchedule(fIO, id) {
  return getter(
    "findArray",
    "/bGetAttendanceUserFinalSchedule/",
    "getAttendanceUserFinalSchedule",
    fIO,
    id,
  );
}

// export function getAttendanceUserFinalScheduleArr(fIO, id) {
//   return getter(
//     "simple/findOne",
//     "/bGetAttendanceUserFinalScheduleArr/",
//     "getAttendanceUserFinalScheduleArr",
//     fIO,
//     id,
//   );
// }

export function bPostAttendanceUserFinalSchedule(fIO, data) {
  return poster(
    "simple/saveOne",
    "/bPostAttendanceUserFinalSchedule",
    "postAttendanceUserFinalSchedule",
    fIO,
    data,
  );
}

export function patchAttendanceUserFinalSchedule(fIO, id, data) {
  return patcher(
    "simple/updateOne",
    "/bPatchAttendanceUserFinalSchedule/",
    "patchAttendanceUserFinalSchedule",
    fIO,
    id,
    data,
  );
}

export function deleteAttendanceUserFinalSchedules(fIO, id) {
  return deleter(
    "simple/deleteMany",
    "/bDeleteAttendanceUserFinalSchedules/",
    "deleteAttendanceUserFinalSchedules",
    fIO,
    id,
  );
}
