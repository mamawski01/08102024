import { deleter, getter, poster } from "./apis/api";

export function getAttendanceUsers(fIO) {
  return getter(
    "simple/findAll",
    "/bGetAttendanceUsers",
    "getAttendanceUsers",
    fIO,
  );
}

export function getAttendanceUser(fIO, id) {
  return getter(
    "findArray",
    "/bGetAttendanceUser/",
    "getAttendanceUser",
    fIO,
    id,
  );
}

export function postAttendanceUser(fIO, data) {
  return poster(
    "simple/saveOne",
    "/bPostAttendanceUser",
    "postAttendanceUser",
    fIO,
    data,
  );
}

export function deleteAttendanceUsers(fIO, data) {
  return deleter(
    "simple/deleteMany",
    "/bDeleteAttendanceUsers",
    "deleteAttendanceUsers",
    fIO,
    data,
  );
}
