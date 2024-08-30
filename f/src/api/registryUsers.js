import { getter, poster } from "./apis/api";

export function getRegistryUsers() {
  return getter("simple/findAll", "/bGetRegistryUsers", "getRegistryUsers");
}

export function getRegistryUser() {
  return getter("simple/findOne", "/bGetRegistryUser", "getRegistryUser");
}

export function postRegistryUser(newData) {
  return poster(
    "postRegistryUser",
    "/bPostRegistryUser",
    "postRegistryUser",
    newData,
  );
}
