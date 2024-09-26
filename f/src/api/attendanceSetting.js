import { getterV1 } from "./apis/apiV1";

export function attendanceSettingFEGetAll() {
  return getterV1(
    "simple/findAll",
    "/attendanceSettingBEGetAll",
    "attendanceSettingFEGetAll",
    "attendanceSettingBEGetAllF2B",
  );
}

// export function getAttendanceUserDefSchedule(fIO, id) {
//   return getter(
//     "simple/findOne",
//     "/bGetAttendanceUserDefSchedule/",
//     "getAttendanceUserDefSchedule",
//     fIO,
//     id,
//   );
// }

// export function postAttendanceUserDefSchedule(fIO, data, confirmedUserId) {
//   return poster(
//     "postAttendanceUserDefSchedule",
//     "/bPostAttendanceUserDefSchedule/",
//     "postAttendanceUserDefSchedule",
//     fIO,
//     data,
//     null,
//     confirmedUserId,
//   );
// }

// export function patchAttendanceUserDefSchedule(fIO, id, data) {
//   return patcher(
//     "simple/updateOne",
//     "/bPatchAttendanceUserDefSchedule/",
//     "patchAttendanceUserDefSchedule",
//     fIO,
//     id,
//     data,
//   );
// }
