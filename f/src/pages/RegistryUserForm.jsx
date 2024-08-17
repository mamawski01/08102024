import Form from "../reusable/components/Form";
import { userModel } from "../reusable/utils/model";

export default function RegistryUserForm() {
  return <Form dataStructure={userModel()}></Form>;
}
