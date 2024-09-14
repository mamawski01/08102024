import toast from "react-hot-toast";
import { convertToJson } from "../../utils/helpers";

export async function onSubmitForm(data, onSubmitRule) {
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
    return convertToJson(data.attendanceUpload[0]);
  }

  if (onSubmitRule === "getAttendanceUserDefSchedule") {
    const transformedDefaultVal = {
      ...data,
      days: Array(7)
        .fill()
        .map((_, index) => {
          const dayIndex = index + 1;
          return {
            timeIn: data[`timeIn${dayIndex}`],
            timeOut: data[`timeOut${dayIndex}`],
            notes: data[`notes${dayIndex}`],
            day: data[`day${dayIndex}`],
          };
        }),
    };

    return transformedDefaultVal;
  }
}
