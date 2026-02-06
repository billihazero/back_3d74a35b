import express from "express";
import mealsRouter from "@routes/meals";
import testRouter from "@routes/test";

const router = express.Router();

router.use("/test", testRouter);
router.use("/meals", mealsRouter);

export default router;
