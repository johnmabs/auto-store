import { prisma } from "@/lib/prisma";

export async function getAdminCustomerRequests() {
  return prisma.customerRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },

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
  });
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
