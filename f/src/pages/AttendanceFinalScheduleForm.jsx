import {
  getAttendanceUserFinalSchedule,
  patchAttendanceUserFinalSchedule,
} from "../api/attendanceUserFinalSchedule";
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
      editDefaultVal={getAttendanceUserFinalSchedule}
      fIOFindOne="f2bGetAttendanceUserFinalSchedule"
      bIOFindOne="b2fGetAttendanceUserFinalSchedule"
      dataEdit={patchAttendanceUserFinalSchedule}
      fIOUpdateOne="f2bPatchAttendanceUserFinalSchedule"
      onSubmitRule="textOnly"
    ></Form>
  );
}
