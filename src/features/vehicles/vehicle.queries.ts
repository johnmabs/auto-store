import { prisma } from "@/lib/prisma";

export type VehicleFilters = {
  make?: string;
  location?: "ABROAD" | "IN_TRANSIT" | "IN_CONGO";
  status?: "AVAILABLE" | "RESERVED" | "SOLD";
};

export async function getVehicles(filters: VehicleFilters = {}) {
  return prisma.vehicle.findMany({
    where: {
      status: filters.status ?? "AVAILABLE",

      ...(filters.make && {
        make: {
          equals: filters.make,
          mode: "insensitive",
        },
      }),

      ...(filters.location && {
        locationStatus: filters.location,
      }),
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

      status: true,
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

export async function getVehicleMakes() {
  const vehicles = await prisma.vehicle.findMany({
    where: {
      status: {
        not: "DRAFT",
      },
    },

    distinct: ["make"],

    select: {
      make: true,
    },

    orderBy: {
      make: "asc",
    },
  });

  return vehicles.map((vehicle) => vehicle.make);
}

export async function getAdminVehicles() {
  return prisma.vehicle.findMany({
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

      locationStatus: true,
      congoCity: true,

      price: true,
      currency: true,

      status: true,
      featured: true,

      createdAt: true,

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

export async function getAdminVehicleById(id: string) {
  return prisma.vehicle.findUnique({
    where: {
      id,
    },
  });
}
