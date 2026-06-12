import express, { type Request, type Response } from "express";
import healthController from "../controllers/health.controller.js";
import accountProcessController from "../controllers/accounts-process.controller.js";

const router = express.Router();

router.get("/api/health", healthController);
router.post("/api/accounts/process", accountProcessController);

export default router;
