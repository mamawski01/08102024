import { postAttendanceUser } from "../api/attendanceUsers";
import Form from "../reusable/components/form/Form";

export default function AttendanceUploadForm() {
  return (
    <Form
      dataStructure={[
        [
          {
            rowLabels: "attendanceUpload",
            inputNames: ["attendanceUpload"],
            inputTypes: ["file"],
            isRequired: [true],
            specifyFiles: [[".txt"]],
          },
        ],
      ]}
      dataSave={postAttendanceUser}
      fIOSaveOne="f2bPostAttendanceUser"
      onSubmitRule="attendanceUpload"
    ></Form>
  );
}
