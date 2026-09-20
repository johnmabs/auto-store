import { z } from "zod";

export const customerRequestSchema = z.object({
  firstName: z.string().trim().min(2, "Le prénom est obligatoire.").max(100),
  lastName: z.string().trim().max(100).optional(),

  phone: z
    .string()
    .trim()
    .min(6, "Le numéro de téléphone est obligatoire.")
    .max(30),

  email: z.email("Adresse email invalide.").optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional(),
  vehicleId: z.string().min(1),
});
