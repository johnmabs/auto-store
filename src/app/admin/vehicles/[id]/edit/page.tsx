import { notFound } from "next/navigation";
import Image from "next/image";

import { VehicleImageActions } from "@/features/vehicles/vehicle-image-actions";
import { VehicleImagesUploadForm } from "@/features/vehicles/vehicle-images-upload-form";

import { getAdminVehicleById } from "@/features/vehicles/vehicle.queries";
import { EditVehicleForm } from "@/features/vehicles/edit-vehicle-form";
import {
  moveVehicleImage,
  removeVehicleImage,
  setPrimaryVehicleImage,
} from "@/features/vehicles/vehicle.actions";

type EditVehiclePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditVehiclePage({
  params,
}: EditVehiclePageProps) {
  const { id } = await params;

  const vehicle = await getAdminVehicleById(id);

  if (!vehicle) {
    notFound();
  }

  return (
    <section className="max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Modifier le véhicule</h1>

        <p className="mt-2 text-neutral-600">
          {vehicle.make} {vehicle.model} — {vehicle.year}
        </p>
      </div>

      <EditVehicleForm vehicleId={vehicle.id} values={vehicle} />

      <div className="mt-12">
        <div>
          <h2 className="text-2xl font-semibold">Images</h2>

          <p className="mt-1 text-sm text-neutral-600">
            Ajoutez les photos utilisées dans le catalogue.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vehicle.images.map((image, index) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-xl border bg-white"
            >
              <div className="relative aspect-4/3 bg-neutral-100">
                <Image
                  src={image.url}
                  alt={image.alt ?? `${vehicle.make} ${vehicle.model}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />

                {image.isPrimary && (
                  <span className="absolute left-2 top-2 rounded bg-black px-2 py-1 text-xs text-white">
                    Principale
                  </span>
                )}
              </div>

              <div className="space-y-3 p-3">
                <VehicleImageActions
                  vehicleId={vehicle.id}
                  imageId={image.id}
                  isPrimary={image.isPrimary}
                  isFirst={index === 0}
                  isLast={index === vehicle.images.length - 1}
                />
              </div>
            </div>
          ))}
        </div>

        {vehicle.images.length === 0 && (
          <div className="mt-6 rounded-xl border border-dashed p-8 text-center text-sm text-neutral-500">
            Aucune image enregistrée.
          </div>
        )}

        <VehicleImagesUploadForm vehicleId={vehicle.id} />
      </div>
    </section>
  );
}
