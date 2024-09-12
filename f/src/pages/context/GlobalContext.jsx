import PropTypes from "prop-types";
import { createContext, useState } from "react";

import { useDataGetter, useGetter } from "../../reusable/hooks/useGetter";
import {
  deleteConfirmedUser,
  getConfirmedUsers,
} from "../../api/confirmedUsers";
import { getAttendanceUsers } from "../../api/attendanceUsers";
import dayjs from "dayjs";

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
  useGetter(getAttendanceUsers, "f2bGetAttendanceUsers", null, attendance1post);

  //attendance User

  //date
  const [dateArrValue, dateArrValueSet] = useState({
    startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  });

  const finalDatesArr = Array.from(
    {
      length:
        (new Date(dateArrValue.endDate) - new Date(dateArrValue.startDate)) /
          (1000 * 3600 * 24) +
        1,
    },
    (_, i) => {
      const date = new Date(dateArrValue.startDate);
      date.setDate(date.getDate() + i);
      return date.toISOString().split("T")[0];
    },
  );
  //date

  return (
    <GlobalContext.Provider
      value={{
        confirmedUsersGets,
        deleteConfirmedUser,
        finalDatesArr,
        dateArrValue,
        dateArrValueSet,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.any,
};
