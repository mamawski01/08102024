import express from "express";

import { upload } from "../utils/multer.js";
import {
  deleter,
  getter,
  patcher,
  poster,
} from "./controller/operators/bOperators.js";
import RegistryUserModel from "./controller/models/RegistryUserModel.js";
import ConfirmedUserModel from "./controller/models/ConfirmedUserModel.js";
import AttendanceUserModel from "./controller/models/AttendanceUserModel.js";
import AttendanceUserDefScheduleModel from "./controller/models/AttendanceUserDefScheduleModel.js";
import AttendanceUserFinalSchedule from "./controller/models/AttendanceUserFinalScheduleModel.js";
import AttendanceSetting from "./controller/models/AttendanceSettingModel.js";
import AttendanceEditedTime from "./controller/models/AttendanceEditedTimeModel.js";

const routes = express.Router();

export const userImgFolderLoc = "userImgFolder";
export const userImgFolderName = "userImg";

//registryUser//
routes.get("/bGetRegistryUsers", (req, res) =>
  getter(req, res, "simple/findAll", RegistryUserModel, "bGetRegistryUsers")
);

routes.get("/bGetRegistryUser/:id", (req, res) =>
  getter(req, res, "simple/findOne", RegistryUserModel, "bGetRegistryUser")
);

routes.post(
  "/bPostRegistryUser",
  upload(userImgFolderLoc, userImgFolderName).single("image"),
  (req, res) =>
    poster(
      req,
      res,
      "bPostRegistryUser",
      RegistryUserModel,
      "bPostRegistryUser",
      userImgFolderLoc
    )
);

routes.patch(
  "/bPatchRegistryUser/:id",
  upload(userImgFolderLoc, userImgFolderName).single("image"),
  (req, res) =>
    patcher(
      req,
      res,
      "bPatchRegistryUser",
      RegistryUserModel,
      "bPatchRegistryUser",
      userImgFolderLoc
    )
);

routes.delete("/bDeleteRegistryUser/:id", (req, res) =>
  deleter(
    req,
    res,
    "bDeleteRegistryUser",
    RegistryUserModel,
    "bDeleteRegistryUser",
    userImgFolderLoc
  )
);
//registryUser//

//confirmedUser//
routes.get("/bGetConfirmedUsers", (req, res) =>
  getter(req, res, "simple/findAll", ConfirmedUserModel, "bGetConfirmedUsers")
);

routes.get("/bGetConfirmedUser/:id", (req, res) =>
  getter(req, res, "simple/findOne", ConfirmedUserModel, "bGetConfirmedUser")
);

//special post
routes.post("/bPostConfirmedUser/:id", (req, res) =>
  poster(
    req,
    res,
    "bPostConfirmedUser",
    ConfirmedUserModel,
    "bPostConfirmedUser",
    userImgFolderLoc,
    RegistryUserModel
  )
);

routes.patch(
  "/bPatchConfirmedUser/:id",
  upload(userImgFolderLoc, userImgFolderName).single("image"),
  (req, res) =>
    patcher(
      req,
      res,
      "bPatchConfirmedUser",
      ConfirmedUserModel,
      "bPatchConfirmedUser",
      userImgFolderLoc
    )
);

routes.delete("/bDeleteConfirmedUser/:id", (req, res) =>
  deleter(
    req,
    res,
    "bDeleteConfirmedUser",
    ConfirmedUserModel,
    "bDeleteConfirmedUser",
    userImgFolderLoc
  )
);
//confirmedUser//

//AttendanceUserModel//
routes.get("/bGetAttendanceUsers", (req, res) =>
  getter(req, res, "simple/findAll", AttendanceUserModel, "bGetAttendanceUsers")
);

// special get findArray
routes.get("/bGetAttendanceUser/:id", (req, res) =>
  getter(req, res, "findArray", AttendanceUserModel, "bGetAttendanceUser")
);

routes.post("/bPostAttendanceUser", (req, res) =>
  poster(
    req,
    res,
    "bPostAttendanceUser",
    AttendanceUserModel,
    "bPostAttendanceUser",
    null
  )
);

routes.delete("/bDeleteAttendanceUsers", (req, res) =>
  deleter(
    req,
    res,
    "simple/deleteMany",
    AttendanceUserModel,
    "bDeleteAttendanceUsers"
  )
);
//AttendanceUserModel//

//AttendanceUserDefScheduleModel//
routes.get("/bGetAttendanceUserDefSchedules", (req, res) =>
  getter(
    req,
    res,
    "simple/findAll",
    AttendanceUserDefScheduleModel,
    "bGetAttendanceUserDefSchedules"
  )
);

routes.get("/bGetAttendanceUserDefSchedule/:id", (req, res) =>
  getter(
    req,
    res,
    "simple/findOne",
    AttendanceUserDefScheduleModel,
    "bGetAttendanceUserDefSchedule"
  )
);

routes.post("/bPostAttendanceUserDefSchedule/:confirmedUserId", (req, res) =>
  poster(
    req,
    res,
    "bPostAttendanceUserDefSchedule",
    AttendanceUserDefScheduleModel,
    "bPostAttendanceUserDefSchedule",
    null,
    null,
    ConfirmedUserModel
  )
);

routes.patch("/bPatchAttendanceUserDefSchedule/:id", (req, res) =>
  patcher(
    req,
    res,
    "simple",
    AttendanceUserDefScheduleModel,
    "bPatchAttendanceUserDefSchedule"
  )
);
//AttendanceUserDefScheduleModel//

//AttendanceUserFinalScheduleModel//
routes.get("/bGetAttendanceUserFinalSchedules", (req, res) =>
  getter(
    req,
    res,
    "simple/findAll",
    AttendanceUserFinalSchedule,
    "bGetAttendanceUserFinalSchedules"
  )
);

routes.get("/bGetAttendanceUserFinalSchedule/:id", (req, res) =>
  getter(
    req,
    res,
    "simple/findOne",
    AttendanceUserFinalSchedule,
    "bGetAttendanceUserFinalSchedule"
  )
);

routes.post("/bPostAttendanceUserFinalSchedule", (req, res) =>
  poster(
    req,
    res,
    "bPostAttendanceUserFinalSchedule",
    AttendanceUserFinalSchedule,
    "bPostAttendanceUserFinalSchedule",
    null
  )
);

routes.patch("/bPatchAttendanceUserFinalSchedule/:id", (req, res) =>
  patcher(
    req,
    res,
    "simple",
    AttendanceUserFinalSchedule,
    "bPatchAttendanceUserFinalSchedule"
  )
);

routes.delete("/bDeleteAttendanceUserFinalSchedules", (req, res) =>
  deleter(
    req,
    res,
    "simple/deleteMany",
    AttendanceUserFinalSchedule,
    "bDeleteAttendanceUserFinalSchedules"
  )
);
//AttendanceUserFinalScheduleModel//

//AttendanceSetting//
routes.get("/attendanceSettingBEGetAll", (req, res) =>
  getter(
    req,
    res,
    "simple/findAll",
    AttendanceSetting,
    "attendanceSettingBEGetAll"
  )
);

routes.get("/attendanceSettingBEGetOne/:id", (req, res) =>
  getter(
    req,
    res,
    "simple/findOne",
    AttendanceSetting,
    "attendanceSettingBEGetOne"
  )
);

routes.post("/attendanceSettingBEPostOne", (req, res) =>
  poster(
    req,
    res,
    "simple",
    AttendanceSetting,
    "attendanceSettingBEPostOne",
    null
  )
);

routes.patch("/attendanceSettingBEPatchOne/:id", (req, res) =>
  patcher(req, res, "simple", AttendanceSetting, "attendanceSettingBEPatchOne")
);

//AttendanceSetting//

//AttendanceEditedTime
routes.get("/attendanceEditedTimeBEGetAll", (req, res) =>
  getter(
    req,
    res,
    "simple/findAll",
    AttendanceEditedTime,
    "bGetAttendanceUserFinalSchedules"
  )
);

routes.get("/attendanceEditedTimeBEGetOne/:id", (req, res) =>
  getter(
    req,
    res,
    "simple/findOne",
    AttendanceEditedTime,
    "bGetAttendanceUserFinalSchedule"
  )
);

routes.post("/attendanceEditedTimeBEPostMany", (req, res) =>
  poster(
    req,
    res,
    "attendanceEditedTimeBEPostMany",
    AttendanceEditedTime,
    "attendanceEditedTimeBEPostMany",
    null
  )
);

routes.patch("/attendanceEditedTimeBEPatchOne/:id", (req, res) =>
  patcher(
    req,
    res,
    "simple",
    AttendanceEditedTime,
    "attendanceEditedTimeBEPatchOne"
  )
);

routes.delete("/attendanceEditedTimeBEDeleteAll", (req, res) =>
  deleter(
    req,
    res,
    "simple/deleteMany",
    AttendanceEditedTime,
    "attendanceEditedTimeBEDeleteAll"
  )
);
//AttendanceEditedTime

export default routes;
