import toast from "react-hot-toast";
import { convertToJson } from "../../utils/helpers";

export function onSubmitForm(data, onSubmitRule) {
  console.log(data);
  if (data.password !== data.repeatPassword) {
    toast.error("Passwords do not match");
    return null;
  }

  if (data.password === data.repeatPassword) {
    const finalData = new FormData();
    for (const key in data) {
      if (typeof data[key] === "string") {
        finalData.append(key, data[key].trim());
      } else if (typeof data[key] === "object") {
        finalData.append(key, data[key][0]);
      } else {
        finalData.append(key, data[key]);
      }
    }

    if (onSubmitRule === "simple") {
      return finalData;
    }
  }

  if (onSubmitRule === "attendanceUpload") {
    convertToJson(data.attendanceUpload[0]);
  }
}
