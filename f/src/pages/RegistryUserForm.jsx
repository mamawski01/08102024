import {
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
      editDefaultVal={getRegistryUser}
      fIOFindOne="f2bGetRegistryUser"
      bIOFindOne="b2fGetRegistryUser"
    ></Form>
  );
}
