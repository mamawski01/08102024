import dayjs from "dayjs";
import Datepicker from "react-tailwindcss-datepicker";

import { useGlobal } from "./context/globalhook";
import TittleH1WithDate from "../reusable/components/TittleH1WithDate";
import { capitalizeFirstLetterEachWord } from "../reusable/utils/helpers";

import {
  BriefcaseIcon,
  Cog8ToothIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/solid";
import Linker from "../reusable/components/Linker";
import Btn from "../reusable/components/Btn";
import { useState } from "react";
import { useFetch, useGet } from "../reusable/hooks/useFetch";
import { poster } from "../api/api";

export default function AttendanceScheduleCreation() {
  const { confirmedUsersGets } = useGlobal();

  //date
  const [dateArrValue, dateArrValueSet] = useState({
    startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    endDate: dayjs().add(1, "month").format("YYYY-MM-DD"),
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

  //attendanceUserDefSchedules
  const updater1post = useGet("b2fPostAttendanceUserDefSchedule");
  const updater2patch = useGet("b2fPatchAttendanceUserDefSchedule");
  useFetch(
    "simple/findAll",
    "/bGetAttendanceUserDefSchedules",
    "getAttendanceUserDefSchedules",
    "f2bGetAttendanceUserDefSchedules",
    null,
    updater1post,
    updater2patch,
  );
  const attendanceUserDefSchedules = useGet("b2fGetAttendanceUserDefSchedules");

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
        return { date, defaultDuty: schedules.defaultDuty, ...day };
      });
      const transformedData = {
        firstName: user.firstName,
        lastName: user.lastName,
        attendanceId: user.attendanceId,
        schedules: dateWithSchedule,
        schedulesId: schedules?._id,
      };
      return transformedData;
    }

    return user;
  });

  const transformedData = usersWithSchedule?.flatMap((data) => {
    const dataSchedule = data.schedules?.map((detail) => {
      const newDetail = { ...detail };
      delete newDetail._id;
      return {
        ...newDetail,
        firstName: data.firstName,
        lastName: data.lastName,
        attendanceId: data.attendanceId,
        UserId: data.attendanceId,
        defaultDuty: "false",
        date: detail.date + " " + data.attendanceId,
      };
    });
    return dataSchedule;
  });

  const numTables = Math.ceil(finalDatesArr.length / 7);
  const minDate = usersWithSchedule?.[0]?.schedules?.[0]?.date;
  return (
    <div>
      <TittleH1WithDate
        title="Attendance Schedule Creation"
        flex={true}
        datePicker={
          <Datepicker
            value={dateArrValue}
            readOnly={true}
            onChange={(newValue) => dateArrValueSet(newValue)}
            inputId="datePicker"
            displayFormat="YYYY-MMM-DD"
            separator="to"
            showShortcuts={true}
            minDate={minDate ? new Date(minDate) : new Date("1993-09-20")}
            configs={{
              shortcuts: {
                today: "Today",
              },
            }}
          />
        }
      >
        <Btn
          text="createAttendance"
          icon={<BriefcaseIcon color="brown" />}
          textSmall={true}
          onClick={() =>
            poster(
              "simple/saveOne",
              "/bPostAttendanceUserFinalSchedule",
              "postAttendanceUserFinalSchedule",
              "f2bPostAttendanceUserFinalSchedule",
              transformedData,
            )
          }
        ></Btn>
        <Linker
          text="finalAttendance"
          textSmall={true}
          icon={<PuzzlePieceIcon color="gold" />}
          to="attendanceFinalSchedule"
        ></Linker>
      </TittleH1WithDate>
      {Array.from({ length: numTables }, (_, q) => (
        <table key={q} className="mb-4 w-full">
          <thead>
            <tr className="border bg-slate-800 [&>*:nth-child(odd)]:bg-zinc-800">
              <th className="w-24 border !bg-stone-700 text-sm">Employee</th>
              {finalDatesArr.slice(q * 7, (q + 1) * 7).map((date, j) => (
                <th
                  key={j}
                  className={`border text-sm ${dayjs(date).format("ddd") === "Sun" && `!bg-red-900`}`}
                >
                  <p>{dayjs(date).format("dddd")}</p>
                  {dayjs(date).format("YYYY-MMM-DD")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {usersWithSchedule
              ?.slice()
              .reverse()
              .map((user, i) => (
                <tr className="[&>*:nth-child(odd)]:bg-zinc-800/20" key={i}>
                  <td className="border">
                    {capitalizeFirstLetterEachWord(user.firstName)}{" "}
                    {capitalizeFirstLetterEachWord(user.lastName)}
                    {user.schedulesId && (
                      <Linker
                        text="ScheduleSetting"
                        textSmall={true}
                        icon={<Cog8ToothIcon color="gold" />}
                        to={`attendanceDefaultScheduleForm/${user.schedulesId}`}
                      ></Linker>
                    )}
                  </td>
                  {user.schedulesId ? (
                    <>
                      {user.schedules
                        .slice(q * 7, (q + 1) * 7)
                        .map((data, i) => (
                          <td
                            className="border align-top [&>*:nth-child(odd)]:bg-indigo-800/40"
                            key={i}
                          >
                            <p className="!bg-green-900">
                              {data.defaultDuty === "true" && `Default`}
                            </p>
                            <p
                              className={`${dayjs(data.date).format("ddd") === "Sun" && `!bg-red-800`}`}
                            >
                              {dayjs(data.date).format("ddd")}
                            </p>
                            <p
                              className={`${data.notes === "Day-Off" && `!bg-fuchsia-800`}`}
                            >
                              {data.notes}
                            </p>
                            {data.timeIn === "day-off" ||
                            data.timeOut === "day-off" ||
                            data.notes === "Day-Off" ? null : (
                              <p>
                                {data.timeIn.replace(" ", "")} to{" "}
                                {data.timeOut.replace(" ", "")}
                              </p>
                            )}
                          </td>
                        ))}
                    </>
                  ) : (
                    <td className="border" colSpan={7}>
                      <p
                        className="flex h-10 w-full cursor-pointer items-center justify-center hover:bg-slate-800"
                        onClick={() =>
                          poster(
                            "postAttendanceUserDefSchedule",
                            "/bPostAttendanceUserDefSchedule/",
                            "postAttendanceUserDefSchedule",
                            "f2bPostAttendanceUserDefSchedule",
                            null,
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
