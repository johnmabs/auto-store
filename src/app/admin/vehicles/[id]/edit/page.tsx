import { notFound } from "next/navigation";

import { getAdminVehicleById } from "@/features/vehicles/vehicle.queries";
import { EditVehicleForm } from "@/features/vehicles/edit-vehicle-form";
import {
  addVehicleImages,
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
              <div className="relative aspect-[4/3] bg-neutral-100">
                <img
                  src={image.url}
                  alt={image.alt ?? `${vehicle.make} ${vehicle.model}`}
                  className="h-full w-full object-cover"
                />

                {image.isPrimary && (
                  <span className="absolute left-2 top-2 rounded bg-black px-2 py-1 text-xs text-white">
                    Principale
                  </span>
                )}
              </div>

              <div className="space-y-3 p-3">
                {!image.isPrimary && (
                  <form
                    action={setPrimaryVehicleImage.bind(
                      null,
                      vehicle.id,
                      image.id,
                    )}
                  >
                    <button
                      type="submit"
                      className="text-sm underline underline-offset-4"
                    >
                      Définir comme principale
                    </button>
                  </form>
                )}

                <div className="flex gap-2">
                  <form
                    action={moveVehicleImage.bind(
                      null,
                      vehicle.id,
                      image.id,
                      "up",
                    )}
                  >
                    <button
                      type="submit"
                      disabled={index === 0}
                      className="rounded border px-3 py-1 text-sm disabled:opacity-30"
                    >
                      ←
                    </button>
                  </form>

                  <form
                    action={moveVehicleImage.bind(
                      null,
                      vehicle.id,
                      image.id,
                      "down",
                    )}
                  >
                    <button
                      type="submit"
                      disabled={index === vehicle.images.length - 1}
                      className="rounded border px-3 py-1 text-sm disabled:opacity-30"
                    >
                      →
                    </button>
                  </form>

                  <form
                    action={removeVehicleImage.bind(null, vehicle.id, image.id)}
                  >
                    <button
                      type="submit"
                      className="rounded border border-red-200 px-3 py-1 text-sm text-red-700"
                    >
                      Supprimer
                    </button>
                  </form>
                </div>
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
          action={addVehicleImages.bind(null, vehicle.id)}
          className="mt-6 rounded-xl border bg-white p-6"
        >
          <label htmlFor="images" className="block text-sm font-medium">
            Ajouter des images
          </label>

          <input
            id="images"
            name="images"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
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
            Envoyer les images
          </button>
        </form>
      </div>
    </section>
  );
}
