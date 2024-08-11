import express from "express";

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
router.post("/bPostRegistryUser", bPostRegistryUser);
router.patch("/bPatchRegistryUser/:id", bPatchRegistryUser);
router.delete("/bDeleteRegistryUser/:id", bDeleteRegistryUser);

export default router;
