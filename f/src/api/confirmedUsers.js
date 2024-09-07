import { deleter, getter, patcher, poster } from "./apis/api";

export function getConfirmedUsers(fIO) {
  return getter(
    "simple/findAll",
    "/bGetConfirmedUsers",
    "getConfirmedUsers",
    fIO,
  );
}

export function getConfirmedUser(fIO, id) {
  return getter(
    "simple/findOne",
    "/bGetConfirmedUser/",
    "getConfirmedUser",
    fIO,
    id,
  );
}

export function postConfirmedUser(fIO, data, id) {
  console.log(data);
  return poster(
    "special/saveOne",
    "/bPostConfirmedUser/",
    "postConfirmedUser",
    fIO,
    data,
    id,
  );
}

export function patchConfirmedUser(fIO, id, data) {
  return patcher(
    "simple/updateOne",
    "/bPatchConfirmedUser/",
    "patchConfirmedUser",
    fIO,
    id,
    data,
  );
}

export function deleteConfirmedUser(fIO, id) {
  return deleter(
    "simple/deleteOne",
    "/bDeleteConfirmedUser/",
    "deleteConfirmedUser",
    fIO,
    id,
  );
}
