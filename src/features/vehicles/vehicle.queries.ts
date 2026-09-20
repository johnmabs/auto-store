import { prisma } from "@/lib/prisma";

export async function getVehicles() {
  return prisma.vehicle.findMany({
    where: {
      status: "AVAILABLE",
    },

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      slug: true,

      make: true,
      model: true,
      variant: true,
      year: true,
      mileage: true,
      bodyType: true,

      fuelType: true,
      transmission: true,

      originCountry: true,
      locationStatus: true,
      congoCity: true,

      price: true,
      currency: true,
      priceBasis: true,
      priceNegotiable: true,

      featured: true,

      images: {
        where: {
          isPrimary: true,
        },
        take: 1,
        select: {
          url: true,
          alt: true,
        },
      },
    },
  });
}

export async function getVehicleBySlug(slug: string) {
  return prisma.vehicle.findFirst({
    where: {
      slug,
      status: {
        in: ["AVAILABLE", "RESERVED", "SOLD"],
      },
    },

    include: {
      images: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
}

export async function getFeaturedVehicles(limit = 6) {
  return prisma.vehicle.findMany({
    where: {
      status: "AVAILABLE",
      featured: true,
    },

    take: limit,

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      slug: true,
      make: true,
      model: true,
      variant: true,
      year: true,

      originCountry: true,
      locationStatus: true,
      congoCity: true,

      price: true,
      currency: true,
      priceBasis: true,

      images: {
        where: {
          isPrimary: true,
        },
        take: 1,
        select: {
          url: true,
          alt: true,
        },
      },
    },
  });
}
