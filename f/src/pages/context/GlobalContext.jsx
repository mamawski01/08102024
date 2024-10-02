import PropTypes from "prop-types";
import { createContext, useState } from "react";

import dayjs from "dayjs";
import { useFetch, useGet } from "../../reusable/hooks/useFetch";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  //ConfirmedUser
  const updater1post = useGet("b2fPostConfirmedUser");
  const updater2patch = useGet("b2fPatchConfirmedUser");
  const updater3delete = useGet("b2fDeleteConfirmedUser");

  useFetch(
    "simple/findAll",
    "/bGetConfirmedUsers",
    "getConfirmedUsers",
    "f2bGetConfirmedUsers",
    null,
    updater1post,
    updater2patch,
    updater3delete,
  );

  const confirmedUsersGets = useGet("b2fGetConfirmedUsers");
  //ConfirmedUser

  //attendance User
  const attendance1post = useGet("b2fPostAttendanceUser");
  const attendance2delete = useGet("b2fDeleteAttendanceUsers");

  useFetch(
    "simple/findAll",
    "/bGetAttendanceUsers",
    "getAttendanceUsers",
    "f2bGetAttendanceUsers",
    null,
    attendance1post,
    attendance2delete,
  );

  const attendanceUsersGets = useGet("b2fGetAttendanceUsers");
  //attendance User

  //date
  const [dateArrValue, dateArrValueSet] = useState({
    startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    // startDate: dayjs("2024-09-01 09:00:00").format("YYYY-MM-DD"),
    // endDate: dayjs("2024-09-30 09:00:00").format("YYYY-MM-DD"),
  });

  const finalDatesArr = [];
  for (
    let date = dayjs(dateArrValue.startDate);
    date.isSameOrBefore(dayjs(dateArrValue.endDate));
    date = date.add(1, "day")
  ) {
    finalDatesArr.push(date.format("YYYY-MM-DD"));
  }
  //date

  //attendanceUserFinalSchedule
  const updaterFinalSchedule1post = useGet(
    "b2fPostAttendanceUserFinalSchedule",
  );
  const patchFinalSchedule3delete = useGet(
    "b2fPatchAttendanceUserFinalSchedule",
  );
  const updaterFinalSchedule3delete = useGet(
    "b2fDeleteAttendanceUserFinalSchedules",
  );
  useFetch(
    "simple/findAll",
    "/bGetAttendanceUserFinalSchedules",
    "bGetAttendanceUserFinalSchedules",
    "f2bGetAttendanceUserFinalSchedules",
    null,
    updaterFinalSchedule1post,
    patchFinalSchedule3delete,
    updaterFinalSchedule3delete,
  );
  const attendanceUserFinalScheduleGets = useGet(
    "b2fGetAttendanceUserFinalSchedules",
  );
  //attendanceUserFinalSchedule

  return (
    <GlobalContext.Provider
      value={{
        confirmedUsersGets,
        finalDatesArr,
        dateArrValue,
        dateArrValueSet,
        attendanceUsersGets,
        attendanceUserFinalScheduleGets,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.any,
};
