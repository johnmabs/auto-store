import { z } from "zod";

export const vehicleFormSchema = z
  .object({
    make: z.string().trim().min(1),
    model: z.string().trim().min(1),
    variant: z.string().trim().optional(),
    year: z.coerce.number().int().min(1950),
    mileage: z.coerce.number().int().nonnegative(),

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
    engine: z.string().trim().optional(),
    power: z.coerce.number().int().positive().optional(),
    color: z.string().trim().optional(),
    interiorColor: z.string().trim().optional(),
    doors: z.coerce.number().int().min(1).max(10).optional(),
    seats: z.coerce.number().int().min(1).max(20).optional(),
    originCountry: z.enum([
      "JAPAN",
      "CHINA",
      "UNITED_ARAB_EMIRATES",
      "GERMANY",
      "FRANCE",
      "SOUTH_KOREA",
      "UNITED_STATES",
    ]),
    locationStatus: z.enum(["ABROAD", "IN_TRANSIT", "IN_CONGO"]),
    congoCity: z.enum(["POINTE_NOIRE", "BRAZZAVILLE"]).optional(),
    price: z.coerce.number().int().positive(),
    currency: z.enum(["XAF", "USD", "EUR"]),
    priceBasis: z.enum(["VEHICLE_ONLY", "LANDED"]),
    priceNegotiable: z.coerce.boolean().default(false),
    status: z.enum(["DRAFT", "AVAILABLE", "RESERVED", "SOLD"]),
    description: z.string().trim().optional(),
    featured: z.coerce.boolean().default(false),
  })
  .refine(
    (data) => data.locationStatus !== "IN_CONGO" || Boolean(data.congoCity),
    {
      path: ["congoCity"],
      message: "La ville est obligatoire pour un véhicule au Congo.",
    },
  );

export type VehicleFormInput = z.infer<typeof vehicleFormSchema>;
