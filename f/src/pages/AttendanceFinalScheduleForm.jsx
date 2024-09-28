import Form from "../reusable/components/form/Form";
import { timeArr } from "../reusable/utils/helpers";

export default function AttendanceFinalScheduleForm() {
  return (
    <Form
      dataStructure={[
        [],
        [
          {
            rowLabels: `attendanceFinalScheduleEdit`,
            inputNames: ["timeIn", "timeOut", "notes"],
            inputTypes: ["option", "option", "option"],
            isRequired: [true, true, true],
            options: [
              timeArr("09:00 am"),
              timeArr("06:00 pm"),
              ["Regular Duty", "Day-Off", "Leave"],
            ],
          },
        ],
      ]}
      patchRule={"simple/updateOne"}
      patchUrl={"/bPatchAttendanceUserFinalSchedule/"}
      patchMess={"patchAttendanceUserFinalSchedule"}
      patchF2b={"f2bPatchAttendanceUserFinalSchedule"}
      getRule={"findArray"}
      getUrl={"/bGetAttendanceUserFinalSchedule/"}
      getMess={"getAttendanceUserFinalSchedule"}
      getF2b={"f2bGetAttendanceUserFinalSchedule"}
      b2f={"b2fGetAttendanceUserFinalSchedule"}
      onSubmitRule="textOnly"
    ></Form>
  );
}
