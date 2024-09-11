import dayjs from "dayjs";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import TittleH1 from "../reusable/components/TittleH1";
import { useNavigate, useParams } from "react-router-dom";
import { useDataGetter, useGetter } from "../reusable/hooks/useGetter";

import { getConfirmedUser } from "../api/confirmedUsers";
import { capitalizeFirstLetterEachWord } from "../reusable/utils/helpers";
import Btn from "../reusable/components/Btn";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function AttendanceAndSchedulePage() {
  const { id } = useParams();
  useGetter(getConfirmedUser, "f2bGetConfirmedUser", id);
  const getConfirmUser = useDataGetter("b2fGetConfirmedUser");
  console.log(getConfirmUser);

  const navigate = useNavigate();

  const [value, setValue] = useState({
    startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  });

  const dates = Array.from(
    {
      length:
        (new Date(value.endDate) - new Date(value.startDate)) /
          (1000 * 3600 * 24) +
        1,
    },
    (_, i) => {
      const date = new Date(value.startDate);
      date.setDate(date.getDate() + i);
      return date.toISOString().split("T")[0];
    },
  );

  return (
    <div>
      <div className="flex w-full items-center justify-end gap-5">
        <div className="z-20 w-64">
          <label htmlFor="datePicker">Date Range:</label>
          <Datepicker
            value={value}
            readOnly={true}
            onChange={(newValue) => setValue(newValue)}
            inputId="datePicker"
            separator="to"
            showShortcuts={true}
            configs={{
              shortcuts: {
                today: "Today",
              },
            }}
          />
        </div>
        <Btn
          color="red"
          text="exit"
          type="button"
          icon={<XMarkIcon></XMarkIcon>}
          onClick={() => navigate(-1)}
        ></Btn>
      </div>
      <TittleH1>Attendance and Schedule</TittleH1>
      <p className="flex flex-wrap gap-x-1 text-lg font-semibold tracking-wide md:text-xl">{`${capitalizeFirstLetterEachWord(getConfirmUser?.firstName)} ${capitalizeFirstLetterEachWord(getConfirmUser?.middleName)} ${capitalizeFirstLetterEachWord(getConfirmUser?.lastName)}`}</p>
      <table className="w-full">
        <thead>
          <tr className="bg-slate-800">
            <th className="border">Day</th>
            <th className="border">Date</th>
            <th className="border">Schedule</th>
            <th className="border">Time Logs</th>
            <th className="border">Duty Hours</th>
            <th className="border">Status</th>
          </tr>
        </thead>
        <tbody>
          {dates.map((date, i) => (
            <tr key={i} className="[&>*:nth-child(odd)]:bg-zinc-800/40">
              <td className="border">
                {i + 1} {dayjs(date).format("ddd")}
              </td>
              <td className="border">{date}</td>
              <td className="border">Time Logs</td>
              <td className="border">Duty Hours</td>
              <td className="border">Status</td>
              <td className="border">Status</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
