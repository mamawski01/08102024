import express from "express";

import { bGetRegistryUsers } from "./controller/registryUsers.js";

const router = express.Router();

router.get("/bGetRegistryUsers", bGetRegistryUsers);

export default router;
