import { userImgFolderLoc } from "../routes.js";
import ConfirmedUserModel from "./models/ConfirmedUserModel.js";
import RegistryUserModel from "./models/RegistryUserModel.js";

import { deleter, getter, patcher, poster } from "./operators/bOperators.js";

export function bGetConfirmedUsers(req, res) {
  getter(req, res, "simple/findAll", ConfirmedUserModel, "bGetConfirmedUsers");
}

export function bGetConfirmedUser(req, res) {
  getter(req, res, "simple/findOne", ConfirmedUserModel, "bGetConfirmedUser");
}

export function bPostConfirmedUser(req, res) {
  poster(
    req,
    res,
    "bPostConfirmedUser",
    ConfirmedUserModel,
    "bPostConfirmedUser",
    userImgFolderLoc,
    RegistryUserModel
  );
}

export function bPatchConfirmedUser(req, res) {
  patcher(
    req,
    res,
    "bPatchConfirmedUser",
    ConfirmedUserModel,
    "bPatchConfirmedUser",
    userImgFolderLoc
  );
}

export function bDeleteConfirmedUser(req, res) {
  deleter(
    req,
    res,
    "bDeleteConfirmedUser",
    ConfirmedUserModel,
    "bDeleteConfirmedUser",
    userImgFolderLoc
  );
}
