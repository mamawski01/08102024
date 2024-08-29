import { getter } from "./operators/operators";

export function getRegistryUsers() {
  return getter("simple/findAll", "/bGetRegistryUsers", "getRegistryUsers");
}
