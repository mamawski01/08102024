import { deleter, getter, patcher, poster } from "./apis/api";

export function getRegistryUsers(fIO) {
  return getter(
    "simple/findAll",
    "/bGetRegistryUsers",
    "getRegistryUsers",
    fIO,
  );
}

export function getRegistryUser(fIO, id) {
  return getter(
    "simple/findOne",
    "/bGetRegistryUser/",
    "getRegistryUser",
    fIO,
    id,
  );
}

export function postRegistryUser(fIO, data) {
  return poster(
    "simple/saveOne",
    "/bPostRegistryUser",
    "postRegistryUser",
    fIO,
    data,
  );
}

export function patchRegistryUser(fIO, id, data) {
  return patcher(
    "simple/updateOne",
    "/bPatchRegistryUser/",
    "patchRegistryUser",
    fIO,
    id,
    data,
  );
}

export function deleteRegistryUser(fIO, id) {
  return deleter(
    "simple/deleteOne",
    "/bDeleteRegistryUser/",
    "deleteRegistryUser",
    fIO,
    id,
  );
}
