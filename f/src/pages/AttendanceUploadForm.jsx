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
      onSubmitRule="attendanceUpload"
    ></Form>
  );
}
