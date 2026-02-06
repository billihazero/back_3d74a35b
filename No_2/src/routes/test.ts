import express from "express";
import * as testController from "@controllers/testController";

const router = express.Router();
router.get("/", testController.getTestData);

export default router;
