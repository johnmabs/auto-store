"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { customerRequestSchema } from "./request.schema";
import {
  canTransitionCustomerRequestStatus,
  type CustomerRequestStatus,
} from "./request-status";
import { requireAdmin } from "../auth/require-admin";
import { customerRequestStatusActionSchema } from "./request-status.schema";

export type CustomerRequestActionState = {
  success: boolean;
  message?: string;
};

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
  nextStatus: CustomerRequestStatus,
  _previousState: CustomerRequestActionState,
): Promise<CustomerRequestActionState> {
  const user = await requireAdmin();

  if (!user) {
    return {
      success: false,
      message: "Votre session a expiré. Reconnectez-vous.",
    };
  }

  const parsed = customerRequestStatusActionSchema.safeParse({
    requestId,
    status: nextStatus,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Paramètres invalides.",
    };
  }

  const request = await prisma.customerRequest.findUnique({
    where: {
      id: requestId,
    },

    select: {
      status: true,
    },
  });

  if (!request) {
    return {
      success: false,
      message: "Demande introuvable.",
    };
  }

  if (!canTransitionCustomerRequestStatus(request.status, nextStatus)) {
    return {
      success: false,
      message: "Cette transition de statut n'est pas autorisée.",
    };
  }

  try {
    await prisma.customerRequest.update({
      where: {
        id: requestId,
      },

      data: {
        status: nextStatus,
      },
    });
  } catch {
    return {
      success: false,
      message: "Impossible de modifier le statut de la demande.",
    };
  }

  revalidatePath("/admin/requests");
  revalidatePath(`/admin/requests/${requestId}`);
  revalidatePath("/admin");

  return {
    success: true,
    message: "Statut mis à jour.",
  };
}

export async function updateCustomerRequestNotes(
  requestId: string,
  _previousState: CustomerRequestActionState,
  formData: FormData,
): Promise<CustomerRequestActionState> {
  const user = await requireAdmin();

  if (!user) {
    return {
      success: false,
      message: "Votre session a expiré. Reconnectez-vous.",
    };
  }

  const adminNotes = formData.get("adminNotes");

  if (adminNotes !== null && typeof adminNotes !== "string") {
    return {
      success: false,
      message: "Notes invalides.",
    };
  }

  try {
    await prisma.customerRequest.update({
      where: {
        id: requestId,
      },

      data: {
        adminNotes: adminNotes?.trim() ? adminNotes.trim() : null,
      },
    });
  } catch {
    return {
      success: false,
      message: "Impossible d'enregistrer les notes.",
    };
  }

  revalidatePath(`/admin/requests/${requestId}`);

  revalidatePath("/admin/requests");

  return {
    success: true,
    message: "Notes enregistrées.",
  };
}
