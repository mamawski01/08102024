import {
  deleteRegistryUser,
  getRegistryUser,
  patchRegistryUser,
  postRegistryUser,
} from "../api/registryUsers";
import Form from "../reusable/components/form/Form";
import { userModel, userModelEdit } from "../reusable/utils/model";

export default function RegistryUserForm() {
  return (
    <Form
      dataStructure={[userModel(), userModelEdit()]}
      dataSave={postRegistryUser}
      dataEdit={patchRegistryUser}
      dataDelete={deleteRegistryUser}
      editDefaultVal={getRegistryUser}
      fIOFindOne="f2bGetRegistryUser"
      bIOFindOne="b2fGetRegistryUser"
      fIOSaveOne="f2bPostRegistryUser"
      fIOUpdateOne="f2bPatchRegistryUser"
      fIODeleteOne="f2bDeleteRegistryUser"
    ></Form>
  );
}
