import { getRegistryUser, postRegistryUser } from "../api/registryUsers";
import Form from "../reusable/components/form/Form";
import { userModel } from "../reusable/utils/model";

export default function RegistryUserForm() {
  return (
    <Form
      dataStructure={userModel()}
      dataSave={postRegistryUser}
      editDefaultVal={getRegistryUser}
      bIO="b2fGetRegistryUser"
    ></Form>
  );
}
