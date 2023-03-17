import express from "express";
import { Router } from "express";

import AreaController from "../controller/area-controller.js";

const router = new Router();

router.get("/upload", express.json(), AreaController.uploadImage);
router.get("/upload-violation", express.json(), AreaController.uploadViolationImage);

export default router;