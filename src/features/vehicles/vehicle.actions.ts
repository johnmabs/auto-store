"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { vehicleFormSchema } from "./vehicle-form.schema";
import {
  deleteVehicleImage,
  uploadVehicleImage,
} from "./vehicle-image.service";

export type VehicleFormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function revalidateVehiclePages(vehicleId: string, slug: string) {
  revalidatePath("/admin/vehicles");
  revalidatePath(`/admin/vehicles/${vehicleId}/edit`);
  revalidatePath("/vehicles");
  revalidatePath(`/vehicles/${slug}`);
}

export async function createVehicle(
  _previousState: VehicleFormState,
  formData: FormData,
): Promise<VehicleFormState> {
  const parsed = vehicleFormSchema.safeParse({
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

  if (!parsed.success) {
    return {
      success: false,
      message: "Veuillez corriger les champs indiqués.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  const baseSlug = slugify(`${data.make}-${data.model}-${data.year}`);

  const slug = `${baseSlug}-${Date.now()}`;

  await prisma.vehicle.create({
    data: {
      ...data,
      slug,

      variant: data.variant || null,
      engine: data.engine || null,
      power: data.power ?? null,

      color: data.color || null,
      interiorColor: data.interiorColor || null,

      congoCity:
        data.locationStatus === "IN_CONGO" ? (data.congoCity ?? null) : null,

      description: data.description || null,

      features: [],
    },
  });

  redirect("/admin/vehicles");
}

export async function updateVehicle(
  vehicleId: string,
  _previousState: VehicleFormState,
  formData: FormData,
): Promise<VehicleFormState> {
  const parsed = vehicleFormSchema.safeParse({
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

  if (!parsed.success) {
    return {
      success: false,
      message: "Veuillez corriger les champs indiqués.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  await prisma.vehicle.update({
    where: {
      id: vehicleId,
    },

    data: {
      ...data,

      variant: data.variant || null,
      engine: data.engine || null,
      power: data.power ?? null,

      color: data.color || null,
      interiorColor: data.interiorColor || null,

      congoCity:
        data.locationStatus === "IN_CONGO" ? (data.congoCity ?? null) : null,

      description: data.description || null,
    },
  });

  redirect("/admin/vehicles");
}

export async function addVehicleImage(vehicleId: string, formData: FormData) {
  const file = formData.get("image");

  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Aucune image sélectionnée.");
  }

  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id: vehicleId,
    },
    select: {
      id: true,
      _count: {
        select: {
          images: true,
        },
      },
    },
  });

  if (!vehicle) {
    throw new Error("Véhicule introuvable.");
  }

  const upload = await uploadVehicleImage(file, vehicle.id);

  await prisma.vehicleImage.create({
    data: {
      vehicleId: vehicle.id,

      url: upload.secure_url,
      publicId: upload.public_id,

      width: upload.width,
      height: upload.height,

      position: vehicle._count.images,

      isPrimary: vehicle._count.images === 0,

      alt: null,
    },
  });

  revalidatePath(`/admin/vehicles/${vehicle.id}/edit`);

  revalidatePath("/admin/vehicles");
  revalidatePath("/vehicles");
}

export async function removeVehicleImage(vehicleId: string, imageId: string) {
  const image = await prisma.vehicleImage.findFirst({
    where: {
      id: imageId,
      vehicleId,
    },

    include: {
      vehicle: {
        select: {
          slug: true,
        },
      },
    },
  });

  if (!image) {
    throw new Error("Image introuvable.");
  }

  await deleteVehicleImage(image.publicId);

  await prisma.$transaction(async (tx) => {
    await tx.vehicleImage.delete({
      where: {
        id: image.id,
      },
    });

    const remainingImages = await tx.vehicleImage.findMany({
      where: {
        vehicleId,
      },

      orderBy: {
        position: "asc",
      },

      select: {
        id: true,
        isPrimary: true,
      },
    });

    for (let position = 0; position < remainingImages.length; position++) {
      await tx.vehicleImage.update({
        where: {
          id: remainingImages[position].id,
        },

        data: {
          position,
        },
      });
    }

    if (image.isPrimary && remainingImages.length > 0) {
      await tx.vehicleImage.update({
        where: {
          id: remainingImages[0].id,
        },

        data: {
          isPrimary: true,
        },
      });
    }
  });

  revalidateVehiclePages(vehicleId, image.vehicle.slug);
}

export async function setPrimaryVehicleImage(
  vehicleId: string,
  imageId: string,
) {
  const image = await prisma.vehicleImage.findFirst({
    where: {
      id: imageId,
      vehicleId,
    },

    include: {
      vehicle: {
        select: {
          slug: true,
        },
      },
    },
  });

  if (!image) {
    throw new Error("Image introuvable.");
  }

  if (!image.isPrimary) {
    await prisma.$transaction([
      prisma.vehicleImage.updateMany({
        where: {
          vehicleId,
          isPrimary: true,
        },

        data: {
          isPrimary: false,
        },
      }),

      prisma.vehicleImage.update({
        where: {
          id: imageId,
        },

        data: {
          isPrimary: true,
        },
      }),
    ]);
  }

  revalidateVehiclePages(vehicleId, image.vehicle.slug);
}

export async function moveVehicleImage(
  vehicleId: string,
  imageId: string,
  direction: "up" | "down",
) {
  const images = await prisma.vehicleImage.findMany({
    where: {
      vehicleId,
    },

    orderBy: {
      position: "asc",
    },

    include: {
      vehicle: {
        select: {
          slug: true,
        },
      },
    },
  });

  const currentIndex = images.findIndex((image) => image.id === imageId);

  if (currentIndex === -1) {
    throw new Error("Image introuvable.");
  }

  const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

  if (targetIndex < 0 || targetIndex >= images.length) {
    return;
  }

  const currentImage = images[currentIndex];
  const targetImage = images[targetIndex];

  await prisma.$transaction([
    prisma.vehicleImage.update({
      where: {
        id: currentImage.id,
      },

      data: {
        position: targetImage.position,
      },
    }),

    prisma.vehicleImage.update({
      where: {
        id: targetImage.id,
      },

      data: {
        position: currentImage.position,
      },
    }),
  ]);

  revalidateVehiclePages(vehicleId, currentImage.vehicle.slug);
}
