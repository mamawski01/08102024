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
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import Linker from "../reusable/components/Linker";

export default function AttendanceScheduleCreation() {
  const { dateArrValue, dateArrValueSet, confirmedUsersGets, finalDatesArr } =
    useGlobal();

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

  const usersWithSchedule = confirmedUsersGets?.map((user) => {
    const schedules = attendanceUserDefSchedules?.find(
      (schedule) => schedule.attendanceId === user.attendanceId,
    );
    if (schedules) {
      const dateWithSchedule = finalDatesArr.map((date) => {
        const dayOfWeek = new Date(date).getDay();
        const day = schedules.days.find(
          (d) =>
            d.day ===
            [
              "sunday",
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
            ][dayOfWeek],
        );
        return { date, ...day };
      });
      console.log(schedules);

      return {
        ...user,
        dateWithSchedule,
        schedules,
      };
    }

    return user;
  });
  //usersWithSchedule

  //numTables
  const numTables = Math.ceil(finalDatesArr.length / 7);
  const datesPerTable = Array(numTables)
    .fill()
    .map((_, i) => {
      const start = i * 7;
      const end = Math.min(start + 7, finalDatesArr.length);
      return finalDatesArr.slice(start, end);
    });
  console.log(datesPerTable);
  //numTables

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
                <th
                  className={`border text-sm ${dayjs(date).format("ddd") === "Sun" && `bg-sky-800`}`}
                  key={j}
                >
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
              .map((user, i) => (
                <tr className="[&>*:nth-child(odd)]:bg-zinc-800/20" key={i}>
                  <td className="border">
                    {capitalizeFirstLetterEachWord(user.firstName)}{" "}
                    {capitalizeFirstLetterEachWord(user.lastName)}
                    {user.dateWithSchedule && (
                      <Linker
                        text="EditDefaultSchedule"
                        textSmall={true}
                        icon={<Cog8ToothIcon color="gold" />}
                        to={`attendanceDefaultScheduleForm/${user.schedules?._id}`}
                      ></Linker>
                    )}
                  </td>
                  {user.dateWithSchedule ? (
                    <>
                      {user.dateWithSchedule.slice(0, 7).map((data, i) => (
                        <td
                          className="border align-top [&>*:nth-child(odd)]:bg-indigo-800/40"
                          key={i}
                        >
                          <p
                            className={`${dayjs(data.date).format("ddd") === "Sun" && `!bg-red-800`}`}
                          >
                            {dayjs(data.date).format("ddd")}
                          </p>

                          {data.timeIn === "day-off" ||
                          data.timeOut === "day-off" ||
                          data.notes === "Day-Off" ? null : (
                            <p>
                              {data.timeIn.replace(" ", "")}-
                              {data.timeOut.replace(" ", "")}
                            </p>
                          )}

                          <p
                            className={`${data.notes === "Day-Off" && `!bg-fuchsia-800`}`}
                          >
                            {data.notes}
                          </p>
                          <p className="!bg-green-900">
                            {user.schedules.defaultDuty === "true" && `Default`}
                          </p>
                        </td>
                      ))}
                    </>
                  ) : (
                    <td className="border" colSpan={7}>
                      <p
                        className="flex h-10 w-full cursor-pointer items-center justify-center hover:bg-slate-800"
                        onClick={() =>
                          postAttendanceUserDefSchedule(
                            "f2bPostAttendanceUserDefSchedule",
                            null,
                            user._id,
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
