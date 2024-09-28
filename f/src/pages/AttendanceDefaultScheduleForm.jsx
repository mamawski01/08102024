import Form from "../reusable/components/form/Form";
import { timeArr } from "../reusable/utils/helpers";

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function AttendanceDefaultScheduleForm() {
  return (
    <Form
      dataStructure={[
        [],
        [
          ...daysOfWeek.map((day) => ({
            rowLabels: day,
            inputNames: [
              `timeIn${daysOfWeek.indexOf(day) + 1}`,
              `timeOut${daysOfWeek.indexOf(day) + 1}`,
              `notes${daysOfWeek.indexOf(day) + 1}`,
              `day${daysOfWeek.indexOf(day) + 1}`,
            ],
            isRequired: [true, true, true, true],
            inputTypes: ["option", "option", "option"],
            options: [
              timeArr("09:00 am"),
              timeArr("06:00 pm"),
              ["Regular Duty", "Day-Off"],
            ],
            disables: [false, false, false, true],
          })),
        ],
      ]}
      // editDefaultVal={getAttendanceUserDefSchedule}
      patchRule={"simple/updateOne"}
      patchUrl={"/bPatchAttendanceUserDefSchedule/"}
      patchMess={"patchAttendanceUserDefSchedule"}
      patchF2b={"f2bPatchConfirmedUser"}
      getRule={"simple/findOne"}
      getUrl={"/bGetAttendanceUserDefSchedule/"}
      getMess={"getAttendanceUserDefSchedule"}
      getF2b={"f2bGetAttendanceUserDefSchedule"}
      b2f={"b2fGetAttendanceUserDefSchedule"}
      onSubmitRule="getAttendanceUserDefSchedule"
    ></Form>
  );
}
