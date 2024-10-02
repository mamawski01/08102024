import Form from "../reusable/components/form/Form";

export default function AttEditTimeLogP() {
  return (
    <Form
      dataStructure={[
        [],
        [
          {
            rowLabels: "EditTimeLogs",
            inputNames: ["DateTime"],
            isRequired: [true],
          },
        ],
      ]}
      patchRule={"simple/updateOne"}
      patchUrl={"/attendanceEditedTimeBEPatchOne/"}
      patchMess={"attendanceEditedTimeFEPatchOne"}
      patchF2b={"attendanceEditedTimeBEPatchOneF2B"}
      getRule={"simple/findOne"}
      getUrl={"/attendanceEditedTimeBEGetOne/"}
      getMess={"attendanceEditedTimeFEGetOne"}
      getF2b={"attendanceEditedTimeBEGetOneF2B"}
      b2f={"attendanceEditedTimeBEGetOneB2F"}
      onSubmitRule="textOnly"
    ></Form>
  );
}
