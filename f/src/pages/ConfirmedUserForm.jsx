import {
  deleteConfirmedUser,
  getConfirmedUser,
  patchConfirmedUser,
  postConfirmedUser,
} from "../api/confirmedUsers";
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
      dataSave={postConfirmedUser}
      dataEdit={patchConfirmedUser}
      dataDelete={deleteConfirmedUser}
      editDefaultVal={getConfirmedUser}
      fIOFindOne="f2bGetConfirmedUser"
      bIOFindOne="b2fGetConfirmedUser"
      fIOSaveOne="f2bPostConfirmedUser"
      fIOUpdateOne="f2bPatchConfirmedUser"
      fIODeleteOne="f2bDeleteConfirmedUser"
    ></Form>
  );
}
