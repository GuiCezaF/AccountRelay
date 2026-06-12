import express, { type Request, type Response } from "express";
import healthController from "../controllers/health.controller.js";

const router = express.Router();

router.get("/health", healthController);

export default router;
