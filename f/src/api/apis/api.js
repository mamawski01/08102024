import toast from "react-hot-toast";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:7000",
  timeout: 10000,
});

function errorHandler(exception, mess) {
  console.log(exception, mess);
  console.log(exception.response.data);
  toast.error(exception.response.data);
  return exception.response.data;
}

export async function getter(rule, url, mess) {
  try {
    if (rule === "simple/findAll") {
      const { data } = await apiClient.get(url);
      console.log(data, mess);
      return data;
    }
  } catch (exception) {
    return errorHandler(exception, mess);
  }
}

export async function poster(rule, url, mess, data) {
  try {
    if (rule === "simple/SaveOne") {
      const newData = await apiClient.post(url, data);
      toast.success(mess);
      return newData;
    }
  } catch (exception) {
    return errorHandler(exception, mess);
  }
}
