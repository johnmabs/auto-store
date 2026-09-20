import Link from "next/link";

import { getAdminVehicles } from "@/features/vehicles/vehicle.queries";

function formatPrice(price: number, currency: "XAF" | "USD" | "EUR") {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

function getStatusLabel(status: "DRAFT" | "AVAILABLE" | "RESERVED" | "SOLD") {
  switch (status) {
    case "DRAFT":
      return "Brouillon";
    case "AVAILABLE":
      return "Disponible";
    case "RESERVED":
      return "Réservé";
    case "SOLD":
      return "Vendu";
  }
}

function getLocationLabel(
  locationStatus: "ABROAD" | "IN_TRANSIT" | "IN_CONGO",
  congoCity: "POINTE_NOIRE" | "BRAZZAVILLE" | null,
) {
  if (locationStatus === "IN_CONGO") {
    return congoCity === "POINTE_NOIRE" ? "Pointe-Noire" : "Brazzaville";
  }

  if (locationStatus === "IN_TRANSIT") {
    return "En transit";
  }

  return "À l'étranger";
}

export default async function AdminVehiclesPage() {
  const vehicles = await getAdminVehicles();

  return (
    <section>
      <div className="flex items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold">Véhicules</h1>

          <p className="mt-2 text-neutral-600">
            Gestion du catalogue de véhicules.
          </p>
        </div>

        <Link
          href="/admin/vehicles/new"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
        >
          Ajouter un véhicule
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-neutral-50">
            <tr>
              <th className="px-4 py-3 font-medium">Véhicule</th>
              <th className="px-4 py-3 font-medium">Localisation</th>
              <th className="px-4 py-3 font-medium">Prix</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3 font-medium">Mise en avant</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((vehicle) => {
              const image = vehicle.images[0];

              return (
                <tr key={vehicle.id} className="border-b last:border-b-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-20 overflow-hidden rounded-md bg-neutral-100">
                        {image ? (
                          <img
                            src={image.url}
                            alt={
                              image.alt ?? `${vehicle.make} ${vehicle.model}`
                            }
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-neutral-400">
                            Sans photo
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="font-medium">
                          {vehicle.make} {vehicle.model}
                        </p>

                        <p className="text-xs text-neutral-500">
                          {vehicle.year}
                          {vehicle.variant ? ` · ${vehicle.variant}` : ""}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {getLocationLabel(
                      vehicle.locationStatus,
                      vehicle.congoCity,
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {formatPrice(vehicle.price, vehicle.currency)}
                  </td>

                  <td className="px-4 py-3">
                    {getStatusLabel(vehicle.status)}
                  </td>

                  <td className="px-4 py-3">
                    {vehicle.featured ? "Oui" : "Non"}
                  </td>

                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/vehicles/${vehicle.id}/edit`}
                      className="underline underline-offset-4"
                    >
                      Modifier
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {vehicles.length === 0 && (
          <div className="p-8 text-center text-neutral-500">
            Aucun véhicule enregistré.
          </div>
        )}
      </div>
    </section>
  );
}
