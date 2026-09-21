import { prisma } from "@/lib/prisma";

export async function getAdminDashboardStats() {
  const [availableVehicles, inTransitVehicles, reservedVehicles, newRequests] =
    await Promise.all([
      prisma.vehicle.count({
        where: {
          status: "AVAILABLE",
        },
      }),

      prisma.vehicle.count({
        where: {
          locationStatus: "IN_TRANSIT",
          status: {
            in: ["AVAILABLE", "RESERVED"],
          },
        },
      }),

      prisma.vehicle.count({
        where: {
          status: "RESERVED",
        },
      }),

      prisma.customerRequest.count({
        where: {
          status: "NEW",
        },
      }),
    ]);

  return {
    availableVehicles,
    inTransitVehicles,
    reservedVehicles,
    newRequests,
  };
}

export async function getRecentCustomerRequests() {
  return prisma.customerRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },

    take: 5,

    select: {
      id: true,
      firstName: true,
      lastName: true,
      phone: true,
      status: true,
      createdAt: true,

      vehicle: {
        select: {
          make: true,
          model: true,
          year: true,
        },
      },
    },
  });
}
