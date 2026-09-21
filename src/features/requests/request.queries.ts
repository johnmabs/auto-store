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
