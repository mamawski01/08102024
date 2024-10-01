import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import objectSupport from "dayjs/plugin/objectSupport";
dayjs.extend(duration);
dayjs.extend(objectSupport);

import Datepicker from "react-tailwindcss-datepicker";
import { Link, useParams } from "react-router-dom";

import { capitalizeFirstLetterEachWord } from "../reusable/utils/helpers";
import { useGlobal } from "./context/globalhook";
import TittleH1WithDate from "../reusable/components/TittleH1WithDate";
import { CogIcon, WrenchIcon } from "@heroicons/react/24/solid";
import { useFetch, useGet } from "../reusable/hooks/useFetch";
import { poster } from "../api/api";

export default function AttendanceAndSchedulePage() {
  const { id } = useParams();
  //confirmedUser
  const getConfirmUser = useGet("b2fGetConfirmedUser");
  useFetch(
    "simple/findOne",
    "/bGetConfirmedUser/",
    "getConfirmedUser",
    "f2bGetConfirmedUser",
    id,
  );
  //confirmedUser

  //AttendanceUser
  const getAttendanceUser_ = useGet("b2fGetAttendanceUser");
  useFetch(
    "findArray",
    "/bGetAttendanceUser/",
    "getAttendanceUser",
    "f2bGetAttendanceUser",
    getConfirmUser?.attendanceId,
  );
  //AttendanceUser

  //AttendanceSetting
  const updater1 = useGet("attendanceSettingBEPostOneB2F");

  useFetch(
    "simple/findAll",
    "/attendanceSettingBEGetAll",
    "attendanceSettingFEGetAll",
    "attendanceSettingBEGetAllF2B",
    null,
    updater1,
  );
  const attendanceSettings = useGet("attendanceSettingBEGetAllB2F");
  console.log(attendanceSettings);
  //AttendanceSetting

  const {
    finalDatesArr,
    dateArrValue,
    dateArrValueSet,
    attendanceUserFinalScheduleGets,
  } = useGlobal();

  //schedule

  const schedule = attendanceUserFinalScheduleGets?.filter((data) => {
    const attendanceId = getConfirmUser?.attendanceId;
    return data.attendanceId === attendanceId;
  });
  // console.log(schedule);

  //time logs
  const timeLogObj = finalDatesArr?.map((date) => {
    const timeLog = getAttendanceUser_?.filter((log) =>
      log.DateTime.startsWith(date),
    );
    return { date, timeLog };
  });
  //time logs

  const minDate = schedule?.[0]?.date.split(" ")[0];

  const timeLogs = timeLogObj?.map((logs) => {
    const timeLog = logs.timeLog?.map((log, k) => {
      if (k % 2 === 0) {
        return {
          timeIn: log.DateTime,
        };
      } else {
        return { timeOut: log.DateTime };
      }
    });
    if (timeLog?.length === 0) return { noLogs: `No Time Log` };
    if (timeLog?.length % 2 === 1) {
      timeLog.push({ timeOut: null });
    }
    return timeLog?.reduce((acc, curr) => ({ ...acc, ...curr }), {});
  });

  // console.log(timeLogs);
  const status = schedule?.map((regularSchedule, i) => {
    const brkDuration = attendanceSettings?.[0].brkDuration;

    const regTimeIn = dayjs(
      regularSchedule.date.split(" ")[0] + " " + regularSchedule.timeIn,
    ).format("YYYY-MM-DD HH:mm:ss");
    const regTimeOut = dayjs(
      regularSchedule.date.split(" ")[0] + " " + regularSchedule.timeOut,
    ).format("YYYY-MM-DD HH:mm:ss");
    const actTimeIn = timeLogs[i]?.timeIn;
    const actTimeOut = timeLogs[i]?.timeOut;
    const duty = actTimeIn && regTimeIn ? null : `Absent`;
    const late =
      duty === `Absent`
        ? null
        : dayjs(actTimeIn).diff(regTimeIn, "m") <= 0
          ? null
          : dayjs.duration(dayjs(actTimeIn).diff(regTimeIn, "m"), "m");

    const tentativeDutyHrs =
      duty === `Absent`
        ? null
        : actTimeOut &&
          dayjs.duration(dayjs(actTimeOut).diff(actTimeIn, "m"), "m").format();
    const dutyHrs = tentativeDutyHrs
      ? dayjs(tentativeDutyHrs)?.subtract(brkDuration.split(" ")[0], "m")
      : dayjs({ hour: 1 });
    const [hour, minute] = dutyHrs.format("h:mm").split(":");
    const dayjsDutyHrs = dayjs({ hour: hour, minute: minute });
    const acceptedHr = dayjsDutyHrs.isBefore(dayjs({ hour: 8 }))
      ? dayjsDutyHrs
      : dayjs({ hour: 8 });

    if (
      regularSchedule.timeIn === "day-off" ||
      regularSchedule.timeOut === "day-off" ||
      regularSchedule.notes === "Day-Off" ||
      regularSchedule.notes === "Leave"
    ) {
      return { duty: `Day-off` };
    } else {
      return {
        regTimeIn,
        actTimeIn,
        duty,
        late: late && dayjs(late).format("hh:mm:ss"),
        regTimeOut,
        actTimeOut,
        tentativeDutyHrs,
        dayjsDutyHrs,
        acceptedHr,
        // underTime:
        //   dutyHrs.isBefore(dayjs({ hour: 8 })) && dutyHrs.format("H:mm"),
        // overTime:
        //   dutyHrs.isAfter(dayjs({ hour: 8, minute: 30 })) &&
        //   dutyHrs.format("H:mm"),
      };
    }
  });
  console.log(status);
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
            minDate={minDate ? new Date(minDate) : new Date("1993-09-20")}
            configs={{
              shortcuts: {
                today: "Today",
              },
            }}
          />
        }
      >
        <div className="flex items-center gap-5">
          <p className="flex flex-wrap gap-x-1 text-lg font-semibold tracking-wide md:text-xl">
            {`${capitalizeFirstLetterEachWord(getConfirmUser?.firstName)} ${capitalizeFirstLetterEachWord(getConfirmUser?.middleName)} ${capitalizeFirstLetterEachWord(getConfirmUser?.lastName)}`}{" "}
            / Attendance Name:{" "}
            {getAttendanceUser_?.[0]
              ? getAttendanceUser_?.[0]?.Name
              : `User Record is missing.`}
          </p>
          <div className="flex gap-1 rounded-md p-1 px-2 hover:bg-slate-200/10">
            <WrenchIcon className="w-7" color="DarkSalmon" />
            {attendanceSettings?.length === 0 ? (
              <span
                className="hidden cursor-pointer md:block"
                onClick={() =>
                  poster(
                    "simple/saveOne",
                    "/attendanceSettingBEPostOne",
                    "attendanceSettingFEPostOne",
                    "attendanceSettingBEPostOneF2B",
                  )
                }
              >
                Create Attendance Setting
              </span>
            ) : (
              <Link
                to={`/homepage/attendanceAndBenefitsPage/attendanceSettingForm/${attendanceSettings?.[0]._id}`}
                className="hidden md:block"
              >
                Attendance Setting
              </Link>
            )}
          </div>
        </div>
        <p>
          Attendance Settings: Break duration:{" "}
          {attendanceSettings?.[0].brkDuration}. Regular Rate:{" "}
          {attendanceSettings?.[0].regularRate}. Holiday Rate:{" "}
          {attendanceSettings?.[0].holidayRate}. Overtime Rate:{" "}
          {attendanceSettings?.[0].overtimeRate}.
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

              <td className="border align-top">
                {schedule?.[i]?.timeIn === "day-off" ||
                schedule?.[i]?.timeOut === "day-off" ||
                schedule?.[i]?.notes === "Day-Off" ||
                schedule?.[i]?.notes === "Leave" ? null : (
                  <div className="[&>*:nth-child(odd)]:bg-gray-800/90">
                    <p>{schedule?.[i]?.timeIn.replace(" ", "")}</p>
                    <p>{schedule?.[i]?.timeOut.replace(" ", "")}</p>
                  </div>
                )}
                <p
                  className={`${schedule?.[i]?.notes === "Regular Duty" ? `bg-inherit` : `!bg-fuchsia-800`}`}
                >
                  {schedule?.[i]?.notes}
                </p>
                <Link
                  className="flex w-full justify-center gap-1 !bg-green-800 hover:!bg-green-600"
                  to={`/homepage/attendanceAndBenefitsPage/attendanceScheduleCreation/attendanceFinalSchedule/${schedule?.[i]?._id}`}
                >
                  Edit
                  <CogIcon className="w-6"></CogIcon>
                </Link>
              </td>
              <td className="border align-top [&>*:nth-child(odd)]:bg-gray-800/40">
                {timeLogs?.[i]?.noLogs && <p>{timeLogs?.[i]?.noLogs}</p>}
                {timeLogs?.[i]?.timeIn && (
                  <p>
                    {dayjs(timeLogs?.[i]?.timeIn).format("h:mma")}{" "}
                    <span className="font-bold text-green-300">In</span>
                  </p>
                )}
                {timeLogs?.[i]?.timeOut && (
                  <p>
                    {dayjs(timeLogs?.[i]?.timeOut).format("h:mma")}{" "}
                    <span className="font-bold text-yellow-300">Out</span>
                  </p>
                )}
                {timeLogs?.[i]?.timeOut === null && (
                  <p className="bg-red-600">No Time Out</p>
                )}
              </td>

              <td className="border align-top">
                {/* {status?.[i]?.late && (
                  <p className="bg-yellow-800">{status?.[i].late} mins late</p>
                )} */}
                {status?.[i]?.duty && (
                  <p
                    className={`${status?.[i]?.duty === "Absent" && `bg-red-600`}`}
                  >
                    {status?.[i]?.duty}{" "}
                  </p>
                )}
                {status?.[i]?.tentativeDutyHrs && (
                  <p>
                    {dayjs(status?.[i]?.tentativeDutyHrs).format("h:mm:ss")}{" "}
                    tentative duty hours
                  </p>
                )}
                {status?.[i]?.dayjsDutyHrs && (
                  <p>
                    {status?.[i]?.dayjsDutyHrs.format("h:mm:ss")} duty hours
                  </p>
                )}{" "}
                {status?.[i]?.acceptedHr && (
                  <p>
                    {status?.[i]?.acceptedHr.format("h:mm:ss")} accepted hours
                  </p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
