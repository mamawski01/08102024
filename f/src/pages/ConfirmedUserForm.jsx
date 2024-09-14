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
      editDefaultVal={getConfirmedUser}
      fIOFindOne="f2bGetConfirmedUser"
      bIOFindOne="b2fGetConfirmedUser"
      dataSave={postConfirmedUser}
      fIOSaveOne="f2bPostConfirmedUser"
      dataEdit={patchConfirmedUser}
      fIOUpdateOne="f2bPatchConfirmedUser"
      dataDelete={deleteConfirmedUser}
      fIODeleteOne="f2bDeleteConfirmedUser"
    ></Form>
  );
}
