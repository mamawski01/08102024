import User from "./models/UserModel.js";

import { deleter, getter, patcher, poster } from "./operators/operators.js";

export function bGetRegistryUsers(req, res) {
  getter(req, res, "simple/findAll", User, "bGetRegistryUsers");
}

export function bGetRegistryUser(req, res) {
  getter(req, res, "simple/findOne", User, "bGetRegistryUser");
}

export function bPostRegistryUser(req, res) {
  poster(req, res, "bPostRegistryUser", User, "bPostRegistryUser");
}

export function bPatchRegistryUser(req, res) {
  patcher(req, res, "bPatchRegistryUser", User, "bPatchRegistryUser");
}

export function bDeleteRegistryUser(req, res) {
  deleter(req, res, "simple", User, "bDeleteRegistryUser");
}
