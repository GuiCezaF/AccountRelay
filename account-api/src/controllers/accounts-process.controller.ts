import type { Request, Response } from "express";
import { ZodError } from "zod";
import { accountBodySchema } from "../types/account";
import { v7 as uuidv7 } from "uuid";

export default async function accountProcessController(
  req: Request,
  res: Response,
) {
  try {
    const body = accountBodySchema.parse(req.body);

    return res.status(202).json({
      status: "RECEIVED",
      request_id: uuidv7(),
      cpf: body.cpf,
      operation: body.operation,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "invalid account body",
        issues: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    return res.status(500).json({ message: "internal server error" });
  }
}
