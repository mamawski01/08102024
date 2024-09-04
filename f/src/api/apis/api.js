import toast from "react-hot-toast";
import axios from "axios";
import io from "socket.io-client";

export const bServer = "http://localhost:7000";

const apiClient = axios.create({
  baseURL: bServer,
  timeout: 1000,
});

export const fSocket = io.connect(bServer);

//first happening then, sending data to BE
function fIOToBIO(fIO, data) {
  fSocket.emit(fIO, data);
}

function errorHandler(exception, mess) {
  console.log(exception, mess);
  console.log(exception.response.data);
  toast.error(exception.response.data);
  return exception.response.data;
}

export async function getter(rule, url, mess, fIO, id) {
  try {
    if (rule === "simple/findAll") {
      const { data } = await apiClient.get(url);
      console.log(data, mess);
      fIOToBIO(fIO, data);
      return data;
    }
    if (rule === "simple/findOne") {
      if (!id) return toast.error(mess);
      const { data } = await apiClient.get(url + id);
      console.log(data, mess);
      fIOToBIO(fIO, data);
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

export async function patcher(rule, url, mess, data) {
  return;
}
