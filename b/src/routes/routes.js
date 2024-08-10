import express from "express";

const router = express.Router();

router.get("/bGetRegistryUsers", bGetRegistryUsers);

export default router;
