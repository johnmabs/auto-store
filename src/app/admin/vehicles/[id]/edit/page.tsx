import { notFound } from "next/navigation";

import { updateVehicle } from "@/features/vehicles/vehicle.actions";
import { VehicleForm } from "@/features/vehicles/vehicle-form";
import { getAdminVehicleById } from "@/features/vehicles/vehicle.queries";

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
    </section>
  );
}
