import { getter, patcher, poster } from "./apis/api";

export function getRegistryUsers() {
  return getter(
    "simple/findAll",
    "/bGetRegistryUsers",
    "getRegistryUsers",
    "f2bGetRegistryUsers",
  );
}

export function getRegistryUser(id) {
  return getter(
    "simple/findOne",
    "/bGetRegistryUser/",
    "getRegistryUser",
    "f2bGetRegistryUser",
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

export function apiRegistryUser(id, data) {
  return patcher("Registry User updated", "/apiUserPatchUser/", id, data);
}
