import User from "./models/UserModel.js";

import { getter, patcher, poster } from "./operators/operators.js";

export function bGetRegistryUsers(req, res) {
  getter(req, res, "simple/findAll", User, "bGetRegistryUsers");
}

export function bGetRegistryUser(req, res) {
  getter(req, res, "simple/findOne", User, "bGetRegistryUser");
}

export function bPostRegistryUser(req, res) {
  poster(req, res, "simple", User, "bPostRegistryUser");
}

export function bPatchRegistryUser(req, res) {
  patcher(req, res, "simple", User, "bPatchRegistryUser");
}

export function bDeleteRegistryUser(req, res) {
  patcher(req, res, "simple", User, "bDeleteRegistryUser");
}
