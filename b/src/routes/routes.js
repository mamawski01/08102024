import express from "express";

import { upload } from "../utils/multer.js";
import {
  bDeleteRegistryUser,
  bGetRegistryUser,
  bGetRegistryUsers,
  bPatchRegistryUser,
  bPostRegistryUser,
} from "./controller/bRegistryUsers.js";
import {
  bDeleteConfirmedUser,
  bGetConfirmedUser,
  bGetConfirmedUsers,
  bPatchConfirmedUser,
  bPostConfirmedUser,
} from "./controller/bConfirmedUser.js";
import {
  bDeleteAttendanceUsers,
  bGetAttendanceUser,
  bGetAttendanceUsers,
  bPostAttendanceUser,
} from "./controller/bAttendanceUsers.js";
import {
  bGetAttendanceUserDefSchedule,
  bGetAttendanceUserDefSchedules,
  bPatchAttendanceUserDefSchedule,
  bPostAttendanceUserDefSchedule,
} from "./controller/bAttendanceUserDefSchedule.js";
import {
  bDeleteAttendanceUserFinalSchedules,
  bGetAttendanceUserFinalSchedule,
  bGetAttendanceUserFinalSchedules,
  bPatchAttendanceUserFinalSchedule,
  bPostAttendanceUserFinalSchedule,
} from "./controller/bGetAttendanceUserFinalScheduleModel.js";
import AttendanceSetting from "./controller/models/AttendanceSettingModel.js";

const router = express.Router();

//registryUser//
export const userImgFolderLoc = "userImgFolder";
export const userImgFolderName = "userImg";

router.get("/bGetRegistryUsers", bGetRegistryUsers);

router.get("/bGetRegistryUser/:id", bGetRegistryUser);

router.post(
  "/bPostRegistryUser",
  upload(userImgFolderLoc, userImgFolderName).single("image"),
  bPostRegistryUser
);

router.patch(
  "/bPatchRegistryUser/:id",
  upload(userImgFolderLoc, userImgFolderName).single("image"),
  bPatchRegistryUser
);

router.delete("/bDeleteRegistryUser/:id", bDeleteRegistryUser);
//registryUser//

//confirmedUser//
router.get("/bGetConfirmedUsers", bGetConfirmedUsers);

router.get("/bGetConfirmedUser/:id", bGetConfirmedUser);

//special post
router.post("/bPostConfirmedUser/:id", bPostConfirmedUser);

router.patch(
  "/bPatchConfirmedUser/:id",
  upload(userImgFolderLoc, userImgFolderName).single("image"),
  bPatchConfirmedUser
);

router.delete("/bDeleteConfirmedUser/:id", bDeleteConfirmedUser);
//confirmedUser//

//AttendanceUserModel//
router.get("/bGetAttendanceUsers", bGetAttendanceUsers);

// special get findArray
router.get("/bGetAttendanceUser/:id", bGetAttendanceUser);

router.post("/bPostAttendanceUser", bPostAttendanceUser);

router.delete("/bDeleteAttendanceUsers", bDeleteAttendanceUsers);
//AttendanceUserModel//

//AttendanceUserDefScheduleModel//
router.get("/bGetAttendanceUserDefSchedules", bGetAttendanceUserDefSchedules);

router.get("/bGetAttendanceUserDefSchedule/:id", bGetAttendanceUserDefSchedule);

router.post(
  "/bPostAttendanceUserDefSchedule/:confirmedUserId",
  bPostAttendanceUserDefSchedule
);

router.patch(
  "/bPatchAttendanceUserDefSchedule/:id",
  bPatchAttendanceUserDefSchedule
);
//AttendanceUserDefScheduleModel//

//AttendanceUserFinalScheduleModel//
router.get(
  "/bGetAttendanceUserFinalSchedules",
  bGetAttendanceUserFinalSchedules
);

router.get(
  "/bGetAttendanceUserFinalSchedule/:id",
  bGetAttendanceUserFinalSchedule
);

// special get findArray
// router.get(
//   "/bGetAttendanceUserFinalScheduleArr/:id",
//   bGetAttendanceUserFinalScheduleArr
// );

router.post(
  "/bPostAttendanceUserFinalSchedule",
  bPostAttendanceUserFinalSchedule
);

router.patch(
  "/bPatchAttendanceUserFinalSchedule/:id",
  bPatchAttendanceUserFinalSchedule
);

router.delete(
  "/bDeleteAttendanceUserFinalSchedules",
  bDeleteAttendanceUserFinalSchedules
);
//AttendanceUserFinalScheduleModel//

//AttendanceSetting//
router.get("/attendanceSettingBEGetAll", (req, res) =>
  getterV1(
    req,
    res,
    "simple/findAll",
    AttendanceSetting,
    "attendanceSettingBEGetAll",
    "attendanceSettingBEGetAllF2B",
    "attendanceSettingBEGetAllB2F"
  )
);
//AttendanceSetting//

export default router;
