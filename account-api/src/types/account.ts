import { z } from "zod";

export const planSchema = z.enum([
  "PRE_20",
  "CONTROLE_50GB",
  "POS_100GB",
  "FIBRA_500MB",
]);

export const operationSchema = z.enum(["ACTIVATE", "SUSPEND"]);

export const accountBodySchema = z
  .object({
    cpf: z
      .string()
      .regex(/^\d{11}$/, "cpf must contain exactly 11 numeric digits"),
    operation: operationSchema,
    plan: planSchema.optional(),
    phone: z.string().trim().min(1).optional(),
    request_id: z.string().trim().min(1).optional(),
  })
  .superRefine((body, ctx) => {
    if (body.operation === "ACTIVATE") {
      if (!body.plan) {
        ctx.addIssue({
          code: "custom",
          path: ["plan"],
          message: "plan is required for ACTIVATE",
        });
      }

      if (!body.phone) {
        ctx.addIssue({
          code: "custom",
          path: ["phone"],
          message: "phone is required for ACTIVATE",
        });
      }
    }
  });

export type AccountBody = z.infer<typeof accountBodySchema>;
export type Operation = z.infer<typeof operationSchema>;
export type Plan = z.infer<typeof planSchema>;
