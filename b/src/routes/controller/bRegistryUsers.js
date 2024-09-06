import { userImgFolderLoc } from "../routes.js";
import RegistryUserModel from "./models/RegistryUserModel.js";

import { deleter, getter, patcher, poster } from "./operators/bOperators.js";

export function bGetRegistryUsers(req, res) {
  getter(req, res, "simple/findAll", RegistryUserModel, "bGetRegistryUsers");
}

export function bGetRegistryUser(req, res) {
  getter(req, res, "simple/findOne", RegistryUserModel, "bGetRegistryUser");
}

export function bPostRegistryUser(req, res) {
  poster(
    req,
    res,
    "bPostRegistryUser",
    RegistryUserModel,
    "bPostRegistryUser",
    userImgFolderLoc
  );
}

export function bPatchRegistryUser(req, res) {
  patcher(
    req,
    res,
    "bPatchRegistryUser",
    RegistryUserModel,
    "bPatchRegistryUser",
    userImgFolderLoc
  );
}

export function bDeleteRegistryUser(req, res) {
  deleter(
    req,
    res,
    "bDeleteRegistryUser",
    RegistryUserModel,
    "bDeleteRegistryUser",
    userImgFolderLoc
  );
}
