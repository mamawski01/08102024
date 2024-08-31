import { getter, poster } from "./apis/api";

export function getRegistryUsers() {
  return getter("simple/findAll", "/bGetRegistryUsers", "getRegistryUsers");
}

export function getRegistryUser() {
  return getter("simple/findOne", "/bGetRegistryUser", "getRegistryUser");
}

export function postRegistryUser(data) {
  return poster(
    "simple/SaveOne",
    "/bPostRegistryUser",
    "postRegistryUser",
    data,
  );
}
