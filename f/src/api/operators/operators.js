import toast from "react-hot-toast";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:7000",
  timeout: 10000,
});

export async function getter(rule, url, mess) {
  try {
    if (rule === "simple/findAll") {
      const { data } = await apiClient.get(url);
      console.log(data, mess);
      return data;
    }
  } catch (exception) {
    console.log(exception, mess);
    console.log(exception.response.data);
    return exception.response.data;
  }
}
