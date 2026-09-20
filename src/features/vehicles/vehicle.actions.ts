"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { vehicleFormSchema } from "./vehicle-form.schema";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createVehicle(formData: FormData) {
  const parsed = vehicleFormSchema.parse({
    make: formData.get("make"),
    model: formData.get("model"),
    variant: formData.get("variant") || undefined,

    year: formData.get("year"),
    mileage: formData.get("mileage"),

    bodyType: formData.get("bodyType"),
    fuelType: formData.get("fuelType"),
    transmission: formData.get("transmission"),

    engine: formData.get("engine") || undefined,
    power: formData.get("power") || undefined,

    color: formData.get("color") || undefined,
    interiorColor: formData.get("interiorColor") || undefined,

    doors: formData.get("doors") || undefined,
    seats: formData.get("seats") || undefined,

    originCountry: formData.get("originCountry"),

    locationStatus: formData.get("locationStatus"),
    congoCity: formData.get("congoCity") || undefined,

    price: formData.get("price"),
    currency: formData.get("currency"),
    priceBasis: formData.get("priceBasis"),

    priceNegotiable: formData.get("priceNegotiable") === "on",

    status: formData.get("status"),

    description: formData.get("description") || undefined,

    featured: formData.get("featured") === "on",
  });

  const baseSlug = slugify(`${parsed.make}-${parsed.model}-${parsed.year}`);

  const slug = `${baseSlug}-${Date.now()}`;

  await prisma.vehicle.create({
    data: {
      ...parsed,

      variant: parsed.variant || null,
      engine: parsed.engine || null,
      power: parsed.power ?? null,

      color: parsed.color || null,
      interiorColor: parsed.interiorColor || null,

      doors: parsed.doors ?? null,
      seats: parsed.seats ?? null,

      congoCity:
        parsed.locationStatus === "IN_CONGO"
          ? (parsed.congoCity ?? null)
          : null,

      description: parsed.description || null,

      features: [],

      slug,
    },
  });

  redirect("/admin/vehicles");
}
