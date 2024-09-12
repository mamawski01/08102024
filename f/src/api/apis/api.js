import toast from "react-hot-toast";
import axios from "axios";
import io from "socket.io-client";
import { swalAlert } from "../../reusable/utils/helpers";

export const bServer = "http://localhost:7000";

const apiClient = axios.create({
  baseURL: bServer,
  timeout: 1000,
});

export const fSocket = io.connect(bServer);

//first happening sending data to BE
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
    if (rule === "simple/findOne" || rule === "findArray") {
      if (!id) return console.log(mess);
      const { data } = await apiClient.get(url + id);
      console.log(data, mess);
      fIOToBIO(fIO, data);
      return data;
    }
  } catch (exception) {
    return errorHandler(exception, mess);
  }
}

export async function poster(rule, url, mess, fIO, data, id) {
  try {
    console.log(data);
    if (rule === "simple/saveOne") {
      const newData = await apiClient.post(url, data);
      toast.success(mess);
      fIOToBIO(fIO, newData);
      return newData;
    }

    if (rule === "special/saveOne") {
      const confirmDelete = await swalAlert(
        "Are you sure to confirm this user?",
        "User will be move to confirmed list",
        "Yes, move to confirmed list!",
      );
      if (confirmDelete.isConfirmed) {
        const newData = await apiClient.post(url + id, data);
        toast.success(mess);
        fIOToBIO(fIO, newData);
        return newData;
      }
    }
  } catch (exception) {
    return errorHandler(exception, mess);
  }
}

export async function patcher(rule, url, mess, fIO, id, data) {
  try {
    if (rule === "simple/updateOne") {
      const newData = await apiClient.patch(url + id, data);
      toast.success(mess);
      fIOToBIO(fIO, newData);
      return newData;
    }
  } catch (exception) {
    return errorHandler(exception, mess);
  }
}

export async function deleter(rule, url, mess, fIO, id) {
  try {
    if (rule === "simple/deleteOne") {
      const confirmDelete = await swalAlert();
      if (confirmDelete.isConfirmed) {
        const data = await apiClient.delete(url + id);
        toast.success(mess);
        fIOToBIO(fIO, data);
        return data;
      }
    }
  } catch (exception) {
    return errorHandler(exception, mess);
  }
}
