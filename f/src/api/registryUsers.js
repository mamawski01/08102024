import { getter, patcher, poster } from "./apis/api";

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

export function postRegistryUser(data) {
  return poster(
    "simple/SaveOne",
    "/bPostRegistryUser",
    "postRegistryUser",
    data,
  );
}

export function patchRegistryUser(id, data) {
  return patcher(
    "simple/UpdateOne",
    "/bPatchRegistryUser/",
    "patchRegistryUser",
    id,
    data,
  );
}
