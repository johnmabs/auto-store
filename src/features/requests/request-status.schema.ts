import { z } from "zod";

export const customerRequestStatusActionSchema = z.object({
  requestId: z.string().min(1),

  status: z.enum(["NEW", "CONTACTED", "CLOSED"]),
});
