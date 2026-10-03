import { describe, expect, test } from "vitest";

import { vehicleFormSchema } from "./vehicle-form.schema";

const validVehicle = {
  make: "Toyota",
  model: "Land Cruiser",
  variant: "Prado",
  year: 2021,
  mileage: 45000,

  bodyType: "SUV",
  fuelType: "DIESEL",
  transmission: "AUTOMATIC",

  originCountry: "JAPAN",

  locationStatus: "IN_CONGO",
  congoCity: "POINTE_NOIRE",

  price: 25000000,
  currency: "XAF",
  priceBasis: "LANDED",

  priceNegotiable: false,
  status: "DRAFT",

  description: "Très bon état.",
  featured: false,

  features: ["AIR_CONDITIONING", "REAR_CAMERA"],
};

describe("vehicleFormSchema", () => {
  test("accepts a valid vehicle", () => {
    const result = vehicleFormSchema.safeParse(validVehicle);

    expect(result.success).toBe(true);
  });

  test("rejects negative mileage", () => {
    const result = vehicleFormSchema.safeParse({
      ...validVehicle,
      mileage: -1,
    });

    expect(result.success).toBe(false);
  });

  test("rejects a non-positive price", () => {
    const result = vehicleFormSchema.safeParse({
      ...validVehicle,
      price: 0,
    });

    expect(result.success).toBe(false);
  });

  test("requires a Congo city when vehicle is in Congo", () => {
    const result = vehicleFormSchema.safeParse({
      ...validVehicle,
      locationStatus: "IN_CONGO",
      congoCity: undefined,
    });

    expect(result.success).toBe(false);
  });

  test("rejects Congo city for a vehicle abroad", () => {
    const result = vehicleFormSchema.safeParse({
      ...validVehicle,
      locationStatus: "ABROAD",
      congoCity: "POINTE_NOIRE",
    });

    expect(result.success).toBe(false);
  });

  test("rejects Congo city for a vehicle in transit", () => {
    const result = vehicleFormSchema.safeParse({
      ...validVehicle,
      locationStatus: "IN_TRANSIT",
      congoCity: "BRAZZAVILLE",
    });

    expect(result.success).toBe(false);
  });

  test("accepts vehicle in transit without Congo city", () => {
    const result = vehicleFormSchema.safeParse({
      ...validVehicle,
      locationStatus: "IN_TRANSIT",
      congoCity: undefined,
    });

    expect(result.success).toBe(true);
  });
});
