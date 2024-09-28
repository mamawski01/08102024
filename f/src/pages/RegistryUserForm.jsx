import Form from "../reusable/components/form/Form";
import { userModel, userModelEdit } from "../reusable/utils/model";

export default function RegistryUserForm() {
  return (
    <Form
      dataStructure={[userModel(), userModelEdit()]}
      postRule={"simple/saveOne"}
      postUrl={"/bPostRegistryUser"}
      postMess={"postRegistryUser"}
      postF2b={"f2bPostRegistryUser"}
      patchRule={"simple/updateOne"}
      patchUrl={"/bPatchRegistryUser/"}
      patchMess={"patchRegistryUser"}
      patchF2b={"f2bPatchRegistryUser"}
      getRule={"simple/findOne"}
      getUrl={"/bGetRegistryUser/"}
      getMess={"getRegistryUser"}
      getF2b={"f2bGetRegistryUser"}
      b2f={"b2fGetRegistryUser"}
      deleteRule={"simple/deleteOne"}
      deleteUrl={"/bDeleteRegistryUser/"}
      deleteMess={"deleteRegistryUser"}
      deleteF2b={"f2bDeleteRegistryUser"}
    ></Form>
  );
}
