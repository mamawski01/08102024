import PropTypes from "prop-types";
import { createContext, useState } from "react";

import { useDataGetter, useGetter } from "../../reusable/hooks/useGetter";
import {
  deleteConfirmedUser,
  getConfirmedUsers,
} from "../../api/confirmedUsers";
import { getAttendanceUsers } from "../../api/attendanceUsers";
import dayjs from "dayjs";
import { getAttendanceUserFinalSchedules } from "../../api/attendanceUserFinalSchedule";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  //ConfirmedUser
  const updater1post = useDataGetter("b2fPostConfirmedUser");
  const updater2patch = useDataGetter("b2fPatchConfirmedUser");
  const updater3delete = useDataGetter("b2fDeleteConfirmedUser");

  useGetter(
    getConfirmedUsers,
    "f2bGetConfirmedUsers",
    null,
    updater1post,
    updater2patch,
    updater3delete,
  );

  const confirmedUsersGets = useDataGetter("b2fGetConfirmedUsers");
  //ConfirmedUser

  //attendance User
  const attendance1post = useDataGetter("b2fPostAttendanceUser");
  const attendance2delete = useDataGetter("b2fDeleteAttendanceUsers");

  useGetter(
    getAttendanceUsers,
    "f2bGetAttendanceUsers",
    null,
    attendance1post,
    attendance2delete,
  );

  const attendanceUsersGets = useDataGetter("b2fGetAttendanceUsers");
  //attendance User

  //date
  const [dateArrValue, dateArrValueSet] = useState({
    startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
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
  const updaterFinalSchedule1post = useDataGetter(
    "b2fPostAttendanceUserFinalSchedule",
  );
  const patchFinalSchedule3delete = useDataGetter(
    "b2fPatchAttendanceUserFinalSchedule",
  );
  const updaterFinalSchedule3delete = useDataGetter(
    "b2fDeleteAttendanceUserFinalSchedules",
  );
  useGetter(
    getAttendanceUserFinalSchedules,
    "f2bGetAttendanceUserFinalSchedules",
    null,
    updaterFinalSchedule1post,
    patchFinalSchedule3delete,
    updaterFinalSchedule3delete,
  );
  const attendanceUserFinalScheduleGets = useDataGetter(
    "b2fGetAttendanceUserFinalSchedules",
  );
  //attendanceUserFinalSchedule

  return (
    <GlobalContext.Provider
      value={{
        confirmedUsersGets,
        deleteConfirmedUser,
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
