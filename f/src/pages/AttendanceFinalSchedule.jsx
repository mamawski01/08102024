import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";

import { useGlobal } from "./context/globalhook";
import TittleH1WithDate from "../reusable/components/TittleH1WithDate";
import { capitalizeFirstLetterEachWord } from "../reusable/utils/helpers";
import { Link } from "react-router-dom";
import { CogIcon } from "@heroicons/react/24/solid";

export default function AttendanceFinalSchedule() {
  const {
    dateArrValue,
    dateArrValueSet,
    finalDatesArr,
    attendanceUserFinalScheduleGets,
    confirmedUsersGets,
  } = useGlobal();

  const transformed = confirmedUsersGets?.map((user) => {
    const schedules = attendanceUserFinalScheduleGets?.filter(
      (detail) => detail.attendanceId === user.attendanceId,
    );
    const transform = {
      firstName: user.firstName,
      lastName: user.lastName,
      attendanceId: user.attendanceId,
      schedules,
    };

    return transform;
  });
  const minDate = transformed?.[0]?.schedules?.[0]?.date.split(" ")[0];

  const numTables = Math.ceil(finalDatesArr.length / 7);
  return (
    <div>
      <TittleH1WithDate
        title="Attendance Final Schedule"
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
      ></TittleH1WithDate>
      {Array.from({ length: numTables }, (_, q) => (
        <table key={q} className="mb-4 w-full">
          <thead>
            <tr className="border bg-slate-800 [&>*:nth-child(odd)]:bg-zinc-800">
              <th className="w-24 border !bg-stone-700 text-sm">Employee</th>

              {finalDatesArr?.slice(q * 7, (q + 1) * 7).map((date, j) => (
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
            {transformed
              ?.slice()
              .reverse()
              .map((user, i) => (
                <tr className="[&>*:nth-child(odd)]:bg-zinc-800/20" key={i}>
                  <td className="border">
                    {capitalizeFirstLetterEachWord(user.firstName)}{" "}
                    {capitalizeFirstLetterEachWord(user.lastName)}
                  </td>
                  {user.schedules
                    ?.slice(q * 7, Math.min((q + 1) * 7, finalDatesArr?.length))
                    .map((data, i) => (
                      <td
                        className="border pb-6 align-top [&>*:nth-child(odd)]:bg-indigo-800/40"
                        key={i}
                      >
                        <p>
                          <Link
                            className="flex w-full justify-center gap-1 !bg-green-800 hover:!bg-green-600"
                            to={`${data._id}`}
                          >
                            Edit
                            <CogIcon className="w-6"></CogIcon>
                          </Link>
                        </p>
                        <p className="!bg-sky-800">
                          {data.defaultDuty === "false" && `Final`}
                        </p>
                        <p
                          className={`${dayjs(data.date).format("ddd") === "Sun" && `!bg-red-800`}`}
                        >
                          {dayjs(data.date).format("ddd")}
                        </p>
                        <p
                          className={`${data.notes === "Regular Duty" ? `bg-inherit` : `!bg-fuchsia-800`}`}
                        >
                          {data.notes}
                        </p>
                        {data.timeIn === "day-off" ||
                        data.timeOut === "day-off" ||
                        data.notes === "Day-Off" ||
                        data.notes === "Leave" ? null : (
                          <p>
                            {data.timeIn.replace(" ", "")} to{" "}
                            {data.timeOut.replace(" ", "")}
                          </p>
                        )}
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}
