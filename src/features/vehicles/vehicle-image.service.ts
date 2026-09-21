import type { UploadApiResponse } from "cloudinary";

import { cloudinary } from "@/lib/cloudinary";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function uploadVehicleImage(
  file: File,
  vehicleId: string,
): Promise<UploadApiResponse> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Format invalide. Utilisez JPEG, PNG ou WebP.");
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("L'image ne doit pas dépasser 10 Mo.");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `auto-store/vehicles/${vehicleId}`,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed."));
          return;
        }

        resolve(result);
      },
    );

    stream.end(buffer);
  });
}

export async function deleteVehicleImage(publicId: string) {
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
    invalidate: true,
  });

  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error("Impossible de supprimer l'image de Cloudinary.");
  }
}
