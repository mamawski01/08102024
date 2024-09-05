import { registryUsersFolderLocation } from "../routes.js";
import RegistryUser from "./models/UserModel.js";

import { deleter, getter, patcher, poster } from "./operators/bOperators.js";

export function bGetRegistryUsers(req, res) {
  getter(req, res, "simple/findAll", RegistryUser, "bGetRegistryUsers");
}

export function bGetRegistryUser(req, res) {
  getter(req, res, "simple/findOne", RegistryUser, "bGetRegistryUser");
}

export function bPostRegistryUser(req, res) {
  poster(
    req,
    res,
    "bPostRegistryUser",
    RegistryUser,
    "bPostRegistryUser",
    registryUsersFolderLocation
  );
}

export function bPatchRegistryUser(req, res) {
  patcher(
    req,
    res,
    "bPatchRegistryUser",
    RegistryUser,
    "bPatchRegistryUser",
    registryUsersFolderLocation
  );
}

export function bDeleteRegistryUser(req, res) {
  deleter(req, res, "bDeleteRegistryUser", RegistryUser, "bDeleteRegistryUser");
}
