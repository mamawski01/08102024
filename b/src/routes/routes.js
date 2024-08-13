import express from "express";

import { upload } from "../utils/multer.js";
import {
  bDeleteRegistryUser,
  bGetRegistryUser,
  bGetRegistryUsers,
  bPatchRegistryUser,
  bPostRegistryUser,
} from "./controller/registryUsers.js";

const router = express.Router();

router.get("/bGetRegistryUsers", bGetRegistryUsers);

router.get("/bGetRegistryUser/:id", bGetRegistryUser);

router.post("/bPostRegistryUser", upload.single("image"), bPostRegistryUser);

router.patch(
  "/bPatchRegistryUser/:id",
  upload.single("image"),
  bPatchRegistryUser
);

router.delete("/bDeleteRegistryUser/:id", bDeleteRegistryUser);

export default router;
