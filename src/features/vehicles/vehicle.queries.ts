import { prisma } from "@/lib/prisma";

export type VehicleFilters = {
  make?: string;
  location?: "ABROAD" | "IN_TRANSIT" | "IN_CONGO";
  status?: "AVAILABLE" | "RESERVED" | "SOLD";

  fuelType?:
    | "GASOLINE"
    | "DIESEL"
    | "HYBRID"
    | "PLUGIN_HYBRID"
    | "ELECTRIC"
    | "OTHER";

  bodyType?:
    | "SUV"
    | "SEDAN"
    | "HATCHBACK"
    | "COUPE"
    | "PICKUP"
    | "MINIVAN"
    | "WAGON"
    | "CONVERTIBLE"
    | "OTHER";

  minYear?: number;
  maxYear?: number;

  minPrice?: number;
  maxPrice?: number;

  sort?: VehicleSort;
};

export type VehicleSort = "recent" | "price_asc" | "price_desc" | "year_desc";

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

      ...(filters.fuelType && {
        fuelType: filters.fuelType,
      }),

      ...(filters.bodyType && {
        bodyType: filters.bodyType,
      }),

      ...((filters.minYear !== undefined || filters.maxYear !== undefined) && {
        year: {
          ...(filters.minYear !== undefined && {
            gte: filters.minYear,
          }),

          ...(filters.maxYear !== undefined && {
            lte: filters.maxYear,
          }),
        },
      }),

      ...((filters.minPrice !== undefined ||
        filters.maxPrice !== undefined) && {
        price: {
          ...(filters.minPrice !== undefined && {
            gte: filters.minPrice,
          }),

          ...(filters.maxPrice !== undefined && {
            lte: filters.maxPrice,
          }),
        },
      }),
    },

    orderBy:
      filters.sort === "price_asc"
        ? { price: "asc" }
        : filters.sort === "price_desc"
          ? { price: "desc" }
          : filters.sort === "year_desc"
            ? { year: "desc" }
            : { createdAt: "desc" },

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

    orderBy: {
      createdAt: "desc",
    },

    take: limit,

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
          publicId: true,
          alt: true,
          width: true,
          height: true,
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
          publicId: true,
          alt: true,
          width: true,
          height: true,
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

    include: {
      images: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
}
