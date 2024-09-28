import Form from "../reusable/components/form/Form";
import { userModelEdit } from "../reusable/utils/model";

export default function ConfirmedUserForm() {
  return (
    <Form
      dataStructure={[
        [],
        [
          ...userModelEdit(),
          {
            rowLabels: "Other fields",
            inputNames: [
              "attendanceId",
              "dailySSSAllocation",
              "monthlyPhilHealth",
              "monthlyPagIbig",
            ],
            isRequired: [true, true, true, true],
          },
        ],
      ]}
      postRule={"special/saveOne"}
      postUrl={"/bPostConfirmedUser/"}
      postMess={"postConfirmedUser"}
      postF2b={"f2bPostConfirmedUser"}
      patchRule={"simple/updateOne"}
      patchUrl={"/bPatchConfirmedUser/"}
      patchMess={"patchConfirmedUser"}
      patchF2b={"f2bPatchConfirmedUser"}
      getRule={"simple/findOne"}
      getUrl={"/bGetConfirmedUser/"}
      getMess={"getConfirmedUser"}
      getF2b={"f2bGetConfirmedUser"}
      b2f={"b2fGetConfirmedUser"}
      deleteRule={"simple/deleteOne"}
      deleteUrl={"/bDeleteConfirmedUser/"}
      deleteMess={"deleteConfirmedUser"}
      deleteF2b={"f2bDeleteConfirmedUser"}
    ></Form>
  );
}
