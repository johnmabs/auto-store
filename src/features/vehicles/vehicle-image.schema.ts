import { z } from "zod";

export const vehicleImageActionSchema = z.object({
  vehicleId: z.string().min(1),
  imageId: z.string().min(1),
});

export const vehicleImageMoveActionSchema = vehicleImageActionSchema.extend({
  direction: z.enum(["up", "down"]),
});
