import { prisma } from "@/lib/prisma";

export type CustomerRequestFilters = {
  search?: string;
  status?: "NEW" | "CONTACTED" | "CLOSED";
  vehicleId?: string;
  page?: number;
};

const REQUESTS_PER_PAGE = 20;

function buildCustomerRequestWhere(filters: CustomerRequestFilters) {
  return {
    ...(filters.status && {
      status: filters.status,
    }),

    ...(filters.vehicleId && {
      vehicleId: filters.vehicleId,
    }),

    ...(filters.search && {
      OR: [
        {
          firstName: {
            contains: filters.search,
            mode: "insensitive" as const,
          },
        },
        {
          lastName: {
            contains: filters.search,
            mode: "insensitive" as const,
          },
        },
        {
          phone: {
            contains: filters.search,
          },
        },
        {
          email: {
            contains: filters.search,
            mode: "insensitive" as const,
          },
        },
      ],
    }),
  };
}

export async function getAdminCustomerRequests(
  filters: CustomerRequestFilters = {},
) {
  const page = Math.max(filters.page ?? 1, 1);

  const where = buildCustomerRequestWhere(filters);

  const [requests, total] = await Promise.all([
    prisma.customerRequest.findMany({
      where,

      orderBy: {
        createdAt: "desc",
      },

      skip: (page - 1) * REQUESTS_PER_PAGE,

      take: REQUESTS_PER_PAGE,

      include: {
        vehicle: {
          select: {
            id: true,
            slug: true,
            make: true,
            model: true,
            year: true,
          },
        },
      },
    }),

    prisma.customerRequest.count({
      where,
    }),
  ]);

  return {
    requests,

    pagination: {
      page,
      perPage: REQUESTS_PER_PAGE,

      total,

      totalPages: Math.max(Math.ceil(total / REQUESTS_PER_PAGE), 1),
    },
  };
}

export async function getAdminCustomerRequestById(id: string) {
  return prisma.customerRequest.findUnique({
    where: {
      id,
    },

    include: {
      vehicle: {
        select: {
          id: true,
          slug: true,
          make: true,
          model: true,
          variant: true,
          year: true,
          price: true,
          currency: true,
          locationStatus: true,
          congoCity: true,
        },
      },
    },
  });
}

export async function getRequestVehicleOptions() {
  return prisma.vehicle.findMany({
    where: {
      requests: {
        some: {},
      },
    },

    orderBy: [
      {
        make: "asc",
      },
      {
        model: "asc",
      },
    ],

    select: {
      id: true,
      make: true,
      model: true,
      year: true,
    },
  });
}
