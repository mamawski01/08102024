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
import {
  ArrowPathIcon,
  CogIcon,
  TrashIcon,
  WrenchIcon,
} from "@heroicons/react/24/solid";
import { useFetch, useGet } from "../reusable/hooks/useFetch";
import { deleter, patcher, poster } from "../api/api";

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
  //AttendanceSetting

  //AttendanceEditedTime
  const updater11 = useGet("attendanceEditedTimeBEPostManyB2F");
  const updater12 = useGet("attendanceEditedTimeBEDeleteAllB2F");
  const updater13 = useGet("attendanceEditedTimeBEPatchOneB2F");
  const updater14 = useGet("attendanceEditedTimeBEPostOneB2F");
  useFetch(
    "simple/findAll",
    "/attendanceEditedTimeBEGetAll",
    "attendanceEditedTimeFEGetAll",
    "attendanceEditedTimeBEGetAllF2B",
    null,
    updater11,
    updater12,
    updater13,
    updater14,
  );
  const attendanceEditedTime = useGet("attendanceEditedTimeBEGetAllB2F");
  //AttendanceEditedTime

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

  const correctSchedule = schedule?.filter((scheduleDates) => {
    const date = scheduleDates.date.split(" ")[0];
    return finalDatesArr.includes(date);
  });

  //edit time logs
  const editTimeLogObj = finalDatesArr?.map((date) => {
    const matchId = attendanceEditedTime?.filter((log) =>
      log.DateTime?.startsWith(date),
    );
    const matchAttendanceId = getConfirmUser?.attendanceId;
    const timeLog = matchId?.filter((obj) => obj.UserId === matchAttendanceId);
    return { date, timeLog };
  });

  //edit time logs

  const editTimeLogs = editTimeLogObj?.map((logs) => {
    const timeLog = logs.timeLog?.flatMap((log, k) => {
      if (k % 2 === 0) {
        return {
          timeIn: log.DateTime,
          name: log.Name,
          id: log._id,
        };
      } else {
        return { timeOut: log.DateTime, name: log.Name, id: log._id };
      }
    });
    if (timeLog?.length === 0) return { noLogs: `No Time Log` };
    return timeLog;
  });
  //time logs
  const timeLogObj = finalDatesArr?.map((date) => {
    const timeLog = getAttendanceUser_?.filter((log) =>
      log.DateTime.startsWith(date),
    );

    return { date, timeLog };
  });
  //time logs

  const minDate = schedule?.[0]?.date.split(" ")[0];

  function formatTime(time) {
    if (time) {
      const [hour, minute] = time.format("HH:mm").split(":");
      const hrTime = dayjs({ hour: hour, minute: minute });
      return hrTime;
    }
  }
  function timeDiff(time1, time2) {
    const timeDiff = dayjs.duration(dayjs(time1).diff(time2, "m"), "m");
    return timeDiff;
  }

  const timeLogs = timeLogObj?.map((logs) => {
    const timeLog = logs.timeLog?.map((log, k) => {
      if (k % 2 === 0) {
        return {
          timeIn: log.DateTime,
          name: log.Name,
        };
      } else {
        return { timeOut: log.DateTime, name: log.Name };
      }
    });
    if (timeLog?.length === 0) return { noLogs: `No Time Log` };
    if (timeLog?.length % 2 === 1) {
      timeLog.push({ timeOut: null });
    }
    return timeLog?.reduce((acc, curr) => ({ ...acc, ...curr }), {});
  });
  const brkDuration = attendanceSettings?.[0].brkDuration;

  const status = correctSchedule?.map((regularSchedule, i) => {
    const convertedBrk = dayjs({ minute: brkDuration?.split(" ")[0] });
    const regTimeIn = dayjs(
      regularSchedule.date?.split(" ")[0] + " " + regularSchedule.timeIn,
    ).format("YYYY-MM-DD HH:mm:ss");
    const regTimeOut = dayjs(
      regularSchedule.date?.split(" ")[0] + " " + regularSchedule.timeOut,
    ).format("YYYY-MM-DD HH:mm:ss");
    const actTimeIn = editTimeLogs[i]?.[0]?.timeIn;
    const actTimeOut =
      editTimeLogs[i]?.[editTimeLogs[i]?.length - 1]?.timeOut ||
      editTimeLogs[i]?.[editTimeLogs[i]?.length - 1]?.timeIn;
    console.log(actTimeOut);
    const duty = actTimeIn && regTimeIn ? null : `Absent`;
    const late =
      duty === `Absent`
        ? null
        : timeDiff(actTimeIn, regTimeIn) <= 0
          ? null
          : timeDiff(actTimeIn, regTimeIn);
    const latePlus =
      timeDiff(actTimeIn, regTimeIn) <= 0
        ? timeDiff(regTimeIn, actTimeIn)
        : timeDiff(actTimeIn, regTimeIn);
    const timeInOffice =
      duty === `Absent` ? null : actTimeOut && timeDiff(actTimeOut, actTimeIn);
    const timeInOfficeWithBrk = timeInOffice
      ? timeDiff(formatTime(timeInOffice), convertedBrk)
      : dayjs({ hour: 1 });
    const timeInOfficeWithBrkAndTimeIn = timeInOffice
      ? timeDiff(timeInOfficeWithBrk, latePlus)
      : dayjs({ hour: 1 });
    const acceptedHr = timeInOfficeWithBrkAndTimeIn;

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
        late,
        underTime: actTimeOut && dayjs(actTimeOut).isBefore(regTimeOut) && true,
        timeInOffice,
        timeInOfficeWithBrk,
        regTimeOut,
        actTimeOut: actTimeOut ? null : `No time out, need correction`,
        isAfterDutyHrAccept: dayjs(actTimeOut).isAfter(regTimeOut),
        acceptedHr,
      };
    }
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
                className="hidden lg:block"
              >
                Attendance Setting
              </Link>
            )}
          </div>
          <button
            className="flex items-center justify-center gap-1 rounded-md p-1 px-2 hover:bg-slate-600"
            onClick={() =>
              poster(
                "simple/saveOne",
                "/attendanceEditedTimeBEPostMany",
                "attendanceEditedTimeFEPostMany",
                "attendanceEditedTimeBEPostManyF2B",
                getAttendanceUser_,
              )
            }
          >
            <ArrowPathIcon className="w-5" />
            <span className="hidden lg:block">Sync</span>
          </button>
          <button
            className="flex items-center justify-center gap-1 rounded-md p-1 px-2 hover:bg-slate-600"
            onClick={() =>
              deleter(
                "simple/deleteMany",
                "/attendanceEditedTimeBEDeleteAll",
                "attendanceEditedTimeFEDeleteAll",
                "attendanceEditedTimeBEDeleteAllF2B",
              )
            }
          >
            <TrashIcon className="w-5" />
            <span className="hidden lg:block"> Clear Edit Time Logs</span>
          </button>
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
            <th className="">Actual Time Logs</th>
            <th className="flex justify-center gap-1">Edit Time Logs</th>
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
                {correctSchedule?.[i]?.timeIn === "day-off" ||
                correctSchedule?.[i]?.timeOut === "day-off" ||
                correctSchedule?.[i]?.notes === "Day-Off" ||
                correctSchedule?.[i]?.notes === "Leave" ? null : (
                  <div className="[&>*:nth-child(odd)]:bg-gray-800/90">
                    <p>{correctSchedule?.[i]?.timeIn.replace(" ", "")}</p>
                    <p>{correctSchedule?.[i]?.timeOut.replace(" ", "")}</p>
                  </div>
                )}
                <p
                  className={`${correctSchedule?.[i]?.notes === "Regular Duty" ? `bg-inherit` : `!bg-fuchsia-800`}`}
                >
                  {correctSchedule?.[i]?.notes}
                </p>
                <Link
                  className="flex w-full justify-center gap-1 !bg-green-800 hover:!bg-green-600"
                  to={`/homepage/attendanceAndBenefitsPage/attendanceScheduleCreation/attendanceFinalSchedule/${correctSchedule?.[i]?._id}`}
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

              <td className="border align-top [&>*:nth-child(odd)]:bg-gray-800/40">
                {editTimeLogs?.[i]?.[0]?.timeIn && (
                  <div className="flex justify-between gap-1">
                    <p>
                      {dayjs(editTimeLogs?.[i]?.[0]?.timeIn).format("h:mma")}{" "}
                      <span className="font-bold text-green-300">In</span>
                    </p>
                    <Link
                      className="flex justify-center gap-1 !bg-lime-800 px-1 hover:!bg-lime-600"
                      to={`/homepage/attendanceAndBenefitsPage/attEditTimeLogP/${editTimeLogs?.[i]?.[0]?.id}`}
                    >
                      Edit
                      <CogIcon className="w-6"></CogIcon>
                    </Link>
                  </div>
                )}
                {editTimeLogs?.[i]?.[1]?.timeOut && (
                  <div className="flex justify-between gap-1">
                    <p>
                      {dayjs(editTimeLogs?.[i]?.[1]?.timeOut).format("h:mma")}{" "}
                      <span className="font-bold text-yellow-300">Out</span>
                    </p>
                    <Link
                      className="flex justify-center gap-1 !bg-yellow-800 px-1 hover:!bg-yellow-600"
                      to={`/homepage/attendanceAndBenefitsPage/attEditTimeLogP/${editTimeLogs?.[i]?.[1]?.id}`}
                    >
                      Edit
                      <CogIcon className="w-6"></CogIcon>
                    </Link>
                  </div>
                )}
                {editTimeLogs?.[i]?.noLogs ||
                  (editTimeLogs?.[i]?.[1]?.timeOut === undefined && (
                    <p className="w-full bg-red-600 text-center">No Time Out</p>
                  ))}
                <button
                  className="flex w-full justify-center gap-1 !bg-cyan-800 px-1 hover:!bg-cyan-600"
                  onClick={() =>
                    poster(
                      "simple/saveOne",
                      "/attendanceEditedTimeBEPostOne",
                      "attendanceEditedTimeBEPostOne",
                      "attendanceEditedTimeBEPostOneF2B",
                      {
                        ...getAttendanceUser_?.[0],
                        No: dayjs().format(),
                        DateTime:
                          finalDatesArr[i] +
                          " " +
                          correctSchedule?.[i]?.timeOut,
                        __v: undefined,
                        _id: undefined,
                      },
                    )
                  }
                >
                  Create Log
                  <CogIcon className="w-6"></CogIcon>
                </button>
              </td>

              <td className="border align-top">
                {status?.[i]?.isAfterDutyHrAccept && (
                  <button
                    className="w-full bg-pink-800 text-start"
                    onClick={() =>
                      patcher(
                        "simple/updateOne",
                        "/attendanceEditedTimeBEPatchOne/",
                        "attendanceEditedTimeFEPatchOne",
                        "attendanceEditedTimeBEPatchOneF2B",
                        editTimeLogs?.[i]?.[1]?.id,
                        {
                          ...editTimeLogObj?.[i]?.timeLog?.[1],
                          DateTime:
                            finalDatesArr[i] +
                            " " +
                            correctSchedule?.[i]?.timeOut,
                        },
                      )
                    }
                  >
                    {status?.[i].isAfterDutyHrAccept} Don&apos;t accept duty
                    hours after {correctSchedule?.[i]?.timeOut.replace(" ", "")}{" "}
                    time-out ?
                  </button>
                )}
                {status?.[i]?.actTimeOut && (
                  <p className="bg-pink-900">{status?.[i]?.actTimeOut}</p>
                )}
                {status?.[i]?.late && (
                  <p className="bg-yellow-800">
                    {status?.[i].late.format("H:mm:ss")} late
                  </p>
                )}
                {status?.[i]?.underTime && (
                  <p className="bg-orange-800">under-time</p>
                )}
                {status?.[i]?.duty && (
                  <p
                    className={`${status?.[i]?.duty === "Absent" && `bg-red-600`}`}
                  >
                    {status?.[i]?.duty}{" "}
                  </p>
                )}
                {status?.[i]?.timeInOffice && (
                  <p>
                    {status?.[i]?.timeInOffice.format("H:mm:ss")} time in office
                  </p>
                )}
                {status?.[i]?.timeInOfficeWithBrk && (
                  <p>
                    {status?.[i]?.timeInOfficeWithBrk.format("H:mm:ss")} time in
                    office with break of {brkDuration}
                  </p>
                )}
                {status?.[i]?.acceptedHr && (
                  <p className="bg-blue-700">
                    {status?.[i]?.acceptedHr.format("H:mm:ss")} accepted hours
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
