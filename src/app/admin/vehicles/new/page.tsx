import { CreateVehicleForm } from "@/features/vehicles/create-vehicle-form";

export default function NewVehiclePage() {
  return (
    <section className="max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Ajouter un véhicule</h1>

        <p className="mt-2 text-neutral-600">
          Enregistrer un nouveau véhicule dans le catalogue.
        </p>
      </div>

      <CreateVehicleForm />
    </section>
  );
}
