import dayjs from "dayjs";
import Datepicker from "react-tailwindcss-datepicker";

import { useGlobal } from "./context/globalhook";
import TittleH1WithDate from "../reusable/components/TittleH1WithDate";
import { capitalizeFirstLetterEachWord } from "../reusable/utils/helpers";
import {
  getAttendanceUserDefSchedules,
  postAttendanceUserDefSchedule,
} from "../api/attendanceUserDefSchedule";
import { useDataGetter, useGetter } from "../reusable/hooks/useGetter";

export default function AttendanceScheduleCreation() {
  const { dateArrValue, dateArrValueSet, confirmedUsersGets, finalDatesArr } =
    useGlobal();
  // console.log(finalDatesArr);
  // console.log(confirmedUsersGets);

  //attendanceUserDefSchedules
  const updater1post = useDataGetter("b2fPostAttendanceUserDefSchedule");
  const updater2patch = useDataGetter("b2fPatchAttendanceUserDefSchedule");
  useGetter(
    getAttendanceUserDefSchedules,
    "f2bGetAttendanceUserDefSchedules",
    null,
    updater1post,
    updater2patch,
    null,
  );
  const attendanceUserDefSchedules = useDataGetter(
    "b2fGetAttendanceUserDefSchedules",
  );
  // console.log(attendanceUserDefSchedules);
  //attendanceUserDefSchedules

  const usersWithSchedule = confirmedUsersGets?.map((user) => {
    const schedules = attendanceUserDefSchedules?.find(
      (schedule) => schedule.attendanceId === user.attendanceId,
    );
    if (schedules) {
      return {
        ...user,
        schedules,
      };
    }

    return { ...user };
  });
  // console.log(usersWithSchedule);

  const numTables = Math.ceil(finalDatesArr.length / 7);
  console.log(numTables);
  const datesPerTable = Array(numTables)
    .fill()
    .map((_, i) => {
      const start = i * 7;
      const end = Math.min(start + 7, finalDatesArr.length);
      return finalDatesArr.slice(start, end);
    });

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
      ></TittleH1WithDate>

      {datesPerTable.map((dates, i) => (
        <table key={i} className="mb-4 w-full">
          <thead>
            <tr className="border bg-slate-800">
              <th className="w-24 border text-sm">Employee</th>
              {dates.map((date, j) => (
                <th className="border text-sm" key={j}>
                  <p>{dayjs(date).format("dddd")}</p>
                  {dayjs(date).format("YYYY-MMM-DD")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersWithSchedule
              ?.slice()
              .reverse()
              .map((data, i) => (
                <tr className="[&>*:nth-child(odd)]:bg-zinc-800/40" key={i}>
                  <td className="border">
                    {capitalizeFirstLetterEachWord(data.firstName)}{" "}
                    {capitalizeFirstLetterEachWord(data.lastName)}
                  </td>
                  {data.schedules ? (
                    <>
                      <td className="border [&>*:nth-child(odd)]:bg-indigo-800/40">
                        {data.schedules.days.monday.timeIn} to{" "}
                        {data.schedules.days.monday.timeOut}
                        <p>
                          {capitalizeFirstLetterEachWord(
                            data.schedules.days.monday.notes,
                          )}
                        </p>
                        <p>
                          {data.schedules.defaultDuty && `Default Schedule`}
                        </p>
                      </td>
                      <td className="border [&>*:nth-child(odd)]:bg-indigo-800/40">
                        {data.schedules.days.monday.timeIn} to{" "}
                        {data.schedules.days.monday.timeOut}
                        <p>
                          {capitalizeFirstLetterEachWord(
                            data.schedules.days.monday.notes,
                          )}
                        </p>
                        <p>
                          {data.schedules.defaultDuty && `Default Schedule`}
                        </p>
                      </td>
                      <td className="border [&>*:nth-child(odd)]:bg-indigo-800/40">
                        {data.schedules.days.monday.timeIn} to{" "}
                        {data.schedules.days.monday.timeOut}
                        <p>
                          {capitalizeFirstLetterEachWord(
                            data.schedules.days.monday.notes,
                          )}
                        </p>
                        <p>
                          {data.schedules.defaultDuty && `Default Schedule`}
                        </p>
                      </td>
                      <td className="border align-top [&>*:nth-child(odd)]:bg-indigo-800/40">
                        lol here {data.schedules.days.monday.timeIn} to{" "}
                        {data.schedules.days.monday.timeOut}
                        <p>
                          {capitalizeFirstLetterEachWord(
                            data.schedules.days.monday.notes,
                          )}
                        </p>
                        <p>
                          {data.schedules.defaultDuty && `Default Schedule`}
                        </p>
                      </td>
                      <td className="border [&>*:nth-child(odd)]:bg-indigo-800/40">
                        {data.schedules.days.monday.timeIn} to{" "}
                        {data.schedules.days.monday.timeOut}
                        <p>
                          {capitalizeFirstLetterEachWord(
                            data.schedules.days.monday.notes,
                          )}
                        </p>
                        <p>
                          {data.schedules.defaultDuty && `Default Schedule`}
                        </p>
                      </td>
                      <td className="border [&>*:nth-child(odd)]:bg-indigo-800/40">
                        {data.schedules.days.monday.timeIn} to{" "}
                        {data.schedules.days.monday.timeOut}
                        <p>
                          {capitalizeFirstLetterEachWord(
                            data.schedules.days.monday.notes,
                          )}
                        </p>
                        <p>
                          {data.schedules.defaultDuty && `Default Schedule`}
                        </p>
                      </td>
                      <td className="border [&>*:nth-child(odd)]:bg-indigo-800/40">
                        {data.schedules.days.monday.timeIn} to{" "}
                        {data.schedules.days.monday.timeOut}
                        <p>
                          {capitalizeFirstLetterEachWord(
                            data.schedules.days.monday.notes,
                          )}
                        </p>
                        <p>
                          {data.schedules.defaultDuty && `Default Schedule`}
                        </p>
                      </td>
                    </>
                  ) : (
                    <td className="border" colSpan={7}>
                      <p
                        className="flex h-10 w-full cursor-pointer items-center justify-center hover:bg-slate-800"
                        onClick={() =>
                          postAttendanceUserDefSchedule(
                            "f2bPostAttendanceUserDefSchedule",
                            null,
                            data._id,
                          )
                        }
                      >
                        Create Default Schedule
                      </p>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}
