import type { Request, Response } from "express";
import { env } from "../envs";

export default async function healthController(req: Request, res: Response) {
  const x_secret = req.header("X-secret");

  if (x_secret == env.SECRET) {
    return res.status(200).json({
      status: "UP",
    });
  }

  return res.status(403).json({ message: "Forbidden: Invalid token" });
}
