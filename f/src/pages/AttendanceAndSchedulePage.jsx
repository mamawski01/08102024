import dayjs from "dayjs";
import Datepicker from "react-tailwindcss-datepicker";
import { useParams } from "react-router-dom";
import { useDataGetter, useGetter } from "../reusable/hooks/useGetter";

import { getConfirmedUser } from "../api/confirmedUsers";
import { capitalizeFirstLetterEachWord } from "../reusable/utils/helpers";
import { getAttendanceUser } from "../api/attendanceUsers";
import { useGlobal } from "./context/globalhook";
import TittleH1WithDate from "../reusable/components/TittleH1WithDate";

export default function AttendanceAndSchedulePage() {
  const { id } = useParams();
  //confirmedUser
  useGetter(getConfirmedUser, "f2bGetConfirmedUser", id);
  const getConfirmUser = useDataGetter("b2fGetConfirmedUser");
  //confirmedUser

  //AttendanceUser
  useGetter(
    getAttendanceUser,
    "f2bGetAttendanceUser",
    getConfirmUser?.attendanceId,
  );
  const getAttendanceUser_ = useDataGetter("b2fGetAttendanceUser");
  //AttendanceUser

  const { finalDatesArr, dateArrValue, dateArrValueSet } = useGlobal();

  //time logs
  const timeLogObj = finalDatesArr?.map((date) => {
    const timeLog = getAttendanceUser_?.filter((log) =>
      log.DateTime.startsWith(date),
    );
    return { date, timeLog };
  });
  //time logs

  return (
    <div>
      <TittleH1WithDate
        title="Attendance and Schedule"
        datePicker={
          <Datepicker
            value={dateArrValue}
            readOnly={true}
            onChange={(newValue) => dateArrValueSet(newValue)}
            inputId="datePicker"
            displayFormat="YYYY-MMM-DD"
            separator="to"
            showShortcuts={true}
            configs={{
              shortcuts: {
                today: "Today",
              },
            }}
          />
        }
      >
        <p className="flex flex-wrap gap-x-1 text-lg font-semibold tracking-wide md:text-xl">
          {`${capitalizeFirstLetterEachWord(getConfirmUser?.firstName)} ${capitalizeFirstLetterEachWord(getConfirmUser?.middleName)} ${capitalizeFirstLetterEachWord(getConfirmUser?.lastName)}`}{" "}
          / Attendance Name: {getAttendanceUser_?.[0].Name}
        </p>
      </TittleH1WithDate>
      <table className="w-full">
        <thead>
          <tr className="sticky top-40 border-x bg-slate-800">
            <th className="">Day</th>
            <th className="">Date</th>
            <th className="">Schedule</th>
            <th className="">Time Logs</th>
            <th className="">Status</th>
          </tr>
        </thead>
        <tbody>
          {timeLogObj.map((date, i) => (
            <tr key={i} className="[&>*:nth-child(odd)]:bg-zinc-800/40">
              <td className="border">{dayjs(date.date).format("ddd")}</td>
              <td className="border">
                {dayjs(date.date).format("YYYY-MMM-DD")}
              </td>
              <td className="border">No Schedule!</td>
              <td className="border [&>*:nth-child(odd)]:bg-gray-800/40">
                {date.timeLog?.length === 0
                  ? "No Time Log"
                  : date.timeLog?.map((timeLog, i) => (
                      <p className="" key={i}>
                        {dayjs(timeLog.DateTime).format("h:mm a")}{" "}
                        {timeLog.Mode}{" "}
                        {i % 2 === 0 ? (
                          <span className="font-bold text-green-300">In</span>
                        ) : (
                          <span className="font-bold text-yellow-300">Out</span>
                        )}
                      </p>
                    ))}
              </td>
              <td className="border"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
