import { getVehicles } from "@/features/vehicles/vehicle.queries";
import { VehicleCard } from "@/features/vehicles/vehicle-card";

export default async function VehiclesPage() {
  const vehicles = await getVehicles();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Nos véhicules</h1>

        <p className="mt-2 max-w-2xl text-neutral-600">
          Découvrez nos véhicules d’occasion disponibles au Congo ou à
          l’importation depuis différents marchés internationaux.
        </p>
      </header>

      {vehicles.length === 0 ? (
        <p>Aucun véhicule disponible pour le moment.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </main>
  );
}
