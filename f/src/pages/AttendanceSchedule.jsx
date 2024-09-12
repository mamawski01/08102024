import dayjs from "dayjs";
import Datepicker from "react-tailwindcss-datepicker";

import { useGlobal } from "./context/globalhook";
import TittleH1WithDate from "../reusable/components/TittleH1WithDate";

export default function AttendanceSchedule() {
  const { dateArrValue, dateArrValueSet } = useGlobal();

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
      <div className="flex flex-col gap-2">
        <table className="w-full">
          <thead>
            <tr className="border bg-slate-800">
              <th className="border">Employee</th>
              <th className="border">
                Monday <p>2024-Sep-09</p>
              </th>
              <th className="border">
                Tuesday <p>2024-Sep-10</p>
              </th>
              <th className="border">
                Wednesday <p>2024-Sep-11</p>
              </th>
              <th className="border">
                Thursday <p>2024-Sep-1</p>2
              </th>
              <th className="border">
                Friday <p>2024-Sep-13</p>
              </th>
              <th className="border">
                Saturday <p>2024-Sep-14</p>
              </th>
              <th className="border">
                Sunday <p>2024-Sep-15</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="[&>*:nth-child(odd)]:bg-zinc-800/40">
              <td className="border">Jonah Balogo</td>
              <td className="border">9am to 6pm</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
            </tr>
            <tr className="[&>*:nth-child(odd)]:bg-zinc-800/40">
              <td className="border">Kim Balogo</td>
              <td className="border">9am to 6pm</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
            </tr>
          </tbody>
        </table>
        <table className="w-full">
          <thead>
            <tr className="border bg-slate-800">
              <th className="border">Employee</th>
              <th className="border">
                Monday <p>2024-Sep-09</p>
              </th>
              <th className="border">
                Tuesday <p>2024-Sep-10</p>
              </th>
              <th className="border">
                Wednesday <p>2024-Sep-11</p>
              </th>
              <th className="border">
                Thursday <p>2024-Sep-1</p>2
              </th>
              <th className="border">
                Friday <p>2024-Sep-13</p>
              </th>
              <th className="border">
                Saturday <p>2024-Sep-14</p>
              </th>
              <th className="border">
                Sunday <p>2024-Sep-15</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="[&>*:nth-child(odd)]:bg-zinc-800/40">
              <td className="border">Jonah Balogo</td>
              <td className="border">9am to 6pm</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
            </tr>
            <tr className="[&>*:nth-child(odd)]:bg-zinc-800/40">
              <td className="border">Kim Balogo</td>
              <td className="border">9am to 6pm</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
              <td className="border">No Schedule!</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
