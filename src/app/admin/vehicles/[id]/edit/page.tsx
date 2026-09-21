import { notFound } from "next/navigation";

import { updateVehicle } from "@/features/vehicles/vehicle.actions";
import { VehicleForm } from "@/features/vehicles/vehicle-form";
import { getAdminVehicleById } from "@/features/vehicles/vehicle.queries";
import { addVehicleImage } from "@/features/vehicles/vehicle.actions";

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

  const updateVehicleWithId = updateVehicle.bind(null, vehicle.id);

  return (
    <section className="max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Modifier le véhicule</h1>

        <p className="mt-2 text-neutral-600">
          {vehicle.make} {vehicle.model} — {vehicle.year}
        </p>
      </div>

      <VehicleForm
        action={updateVehicleWithId}
        values={vehicle}
        submitLabel="Enregistrer les modifications"
      />

      <div className="mt-12">
        <div>
          <h2 className="text-2xl font-semibold">Images</h2>

          <p className="mt-1 text-sm text-neutral-600">
            Ajoutez les photos utilisées dans le catalogue.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vehicle.images.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-xl border bg-white"
            >
              <div className="aspect-[4/3] bg-neutral-100">
                <img
                  src={image.url}
                  alt={image.alt ?? `${vehicle.make} ${vehicle.model}`}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-3 text-sm">
                {image.isPrimary ? (
                  <span className="font-medium">Image principale</span>
                ) : (
                  <span className="text-neutral-500">Image secondaire</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {vehicle.images.length === 0 && (
          <div className="mt-6 rounded-xl border border-dashed p-8 text-center text-sm text-neutral-500">
            Aucune image enregistrée.
          </div>
        )}

        <form
          action={addVehicleImage.bind(null, vehicle.id)}
          className="mt-6 rounded-xl border bg-white p-6"
        >
          <label htmlFor="image" className="block text-sm font-medium">
            Ajouter une image
          </label>

          <input
            id="image"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required
            className="mt-2 block w-full text-sm"
          />

          <p className="mt-2 text-xs text-neutral-500">
            JPEG, PNG ou WebP. Maximum 10 Mo.
          </p>

          <button
            type="submit"
            className="mt-4 rounded-lg bg-black px-4 py-2 text-sm text-white"
          >
            Envoyer l&apos;image
          </button>
        </form>
      </div>
    </section>
  );
}
