import Form from "../reusable/components/form/Form";

export default function AttendanceSettingForm() {
  return (
    <Form
      dataStructure={[
        [],
        [
          {
            rowLabels: "attendanceSetting",
            inputNames: [
              "brkDuration",
              "overtimeStarts",
              "regularRate",
              "holidayRate",
              "overtimeRate",
            ],
            isRequired: [true, true, true, true, true],
            inputTypes: ["option", "option", "option", "option", "option"],
            options: [
              ["15 mins", "30 mins", "60 mins"],
              ["15 mins", "30 mins", "60 mins"],
              ["1"],
              ["1.3"],
              ["1.25"],
            ],
          },
        ],
      ]}
      patchRule={"simple/updateOne"}
      patchUrl={"/attendanceSettingBEPatchOne/"}
      patchMess={"attendanceSettingFEPatchOne"}
      patchF2b={"attendanceSettingBEPatchOneF2B"}
      getRule={"simple/findOne"}
      getUrl={"/attendanceSettingBEGetOne/"}
      getMess={"attendanceSettingFEGetOne"}
      getF2b={"attendanceSettingBEGetOneF2B"}
      b2f={"attendanceSettingBEGetOneB2F"}
      onSubmitRule="textOnly"
    ></Form>
  );
}
