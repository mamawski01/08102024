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

const router = express.Router();

//registryUser
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
//registryUser

//confirmedUser

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

//confirmedUser

export default router;
