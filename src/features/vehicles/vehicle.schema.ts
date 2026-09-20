import { z } from "zod";

const currentYear = new Date().getFullYear();

export const vehicleSchema = z
  .object({
    make: z.string().trim().min(1).max(100),
    model: z.string().trim().min(1).max(100),

    variant: z.string().trim().max(100).optional().or(z.literal("")),

    year: z
      .number()
      .int()
      .min(1950)
      .max(currentYear + 1),

    mileage: z.number().int().nonnegative(),

    bodyType: z.enum([
      "SUV",
      "SEDAN",
      "HATCHBACK",
      "COUPE",
      "PICKUP",
      "MINIVAN",
      "WAGON",
      "CONVERTIBLE",
      "OTHER",
    ]),

    fuelType: z.enum([
      "GASOLINE",
      "DIESEL",
      "HYBRID",
      "PLUGIN_HYBRID",
      "ELECTRIC",
      "OTHER",
    ]),

    transmission: z.enum(["AUTOMATIC", "MANUAL", "CVT", "DCT", "OTHER"]),
    engine: z.string().trim().max(100).optional().or(z.literal("")),
    power: z.number().int().positive().optional(),
    color: z.string().trim().max(50).optional().or(z.literal("")),
    interiorColor: z.string().trim().max(50).optional().or(z.literal("")),
    doors: z.number().int().min(1).max(10).optional(),
    seats: z.number().int().min(1).max(20).optional(),
    originCountry: z.string().trim().min(1).max(100),
    locationStatus: z.enum(["ABROAD", "IN_TRANSIT", "IN_CONGO"]),
    congoCity: z.enum(["POINTE_NOIRE", "BRAZZAVILLE"]).nullable().optional(),
    price: z.number().int().positive(),
    currency: z.enum(["XAF", "USD", "EUR"]),
    priceBasis: z.enum(["VEHICLE_ONLY", "LANDED"]),
    priceNegotiable: z.boolean().default(false),
    status: z.enum(["DRAFT", "AVAILABLE", "RESERVED", "SOLD"]).default("DRAFT"),
    description: z.string().trim().max(5000).optional().or(z.literal("")),
    featured: z.boolean().default(false),
    features: z.array(z.string().trim().min(1).max(100)).default([]),
  })
  .refine(
    (vehicle) => {
      if (vehicle.locationStatus === "IN_CONGO") {
        return vehicle.congoCity != null;
      }

      return true;
    },
    {
      message: "La ville est obligatoire pour un véhicule situé au Congo.",
      path: ["congoCity"],
    },
  )
  .refine(
    (vehicle) => {
      if (vehicle.locationStatus !== "IN_CONGO") {
        return vehicle.congoCity == null;
      }

      return true;
    },
    {
      message:
        "La ville congolaise doit être vide si le véhicule n'est pas au Congo.",
      path: ["congoCity"],
    },
  );

export type VehicleInput = z.infer<typeof vehicleSchema>;
