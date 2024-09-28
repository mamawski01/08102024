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
      postRule={"simple/saveOne"}
      postUrl={"/bPostAttendanceUser"}
      postMess={"postAttendanceUser"}
      postF2b={"f2bPostAttendanceUser"}
      onSubmitRule="attendanceUpload"
    ></Form>
  );
}
