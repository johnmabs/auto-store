"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { customerRequestSchema } from "./request.schema";

export type CustomerRequestState = {
  success: boolean;
  message: string;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    phone?: string[];
    email?: string[];
    message?: string[];
  };
};

export async function createCustomerRequest(
  _previousState: CustomerRequestState,
  formData: FormData,
): Promise<CustomerRequestState> {
  const result = customerRequestSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName") || undefined,
    phone: formData.get("phone"),
    email: formData.get("email") || undefined,
    message: formData.get("message") || undefined,
    vehicleId: formData.get("vehicleId"),
  });

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return {
      success: false,
      message: "Veuillez corriger les champs indiqués.",
      errors: {
        firstName: errors.firstName,
        lastName: errors.lastName,
        phone: errors.phone,
        email: errors.email,
        message: errors.message,
      },
    };
  }

  const vehicle = await prisma.vehicle.findFirst({
    where: {
      id: result.data.vehicleId,
      status: {
        in: ["AVAILABLE", "RESERVED"],
      },
    },
    select: {
      id: true,
    },
  });

  if (!vehicle) {
    return {
      success: false,
      message: "Ce véhicule n'est plus disponible pour une nouvelle demande.",
    };
  }

  try {
    await prisma.customerRequest.create({
      data: {
        firstName: result.data.firstName,
        lastName: result.data.lastName || null,
        phone: result.data.phone,
        email: result.data.email || null,
        message: result.data.message || null,
        vehicleId: vehicle.id,
      },
    });

    return {
      success: true,
      message:
        "Votre demande a bien été envoyée. Nous vous contacterons prochainement.",
    };
  } catch {
    return {
      success: false,
      message: "Une erreur est survenue lors de l'envoi de votre demande.",
    };
  }
}

export async function updateCustomerRequestStatus(
  requestId: string,
  status: "NEW" | "CONTACTED" | "CLOSED",
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await prisma.customerRequest.update({
    where: {
      id: requestId,
    },

    data: {
      status,
    },
  });

  revalidatePath("/admin/requests");
}
