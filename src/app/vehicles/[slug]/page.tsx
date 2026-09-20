import { notFound } from "next/navigation";

import { getVehicleBySlug } from "@/features/vehicles/vehicle.queries";
import { CustomerRequestForm } from "@/features/requests/customer-request-form";

type VehiclePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatPrice(price: number, currency: "XAF" | "USD" | "EUR") {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

function getLocationLabel(
  locationStatus: "ABROAD" | "IN_TRANSIT" | "IN_CONGO",
  congoCity: "POINTE_NOIRE" | "BRAZZAVILLE" | null,
  originCountry: string,
) {
  if (locationStatus === "IN_CONGO") {
    if (congoCity === "POINTE_NOIRE") {
      return "Disponible à Pointe-Noire";
    }

    if (congoCity === "BRAZZAVILLE") {
      return "Disponible à Brazzaville";
    }
  }

  if (locationStatus === "IN_TRANSIT") {
    return "En transit vers le Congo";
  }

  return `Disponible à l'importation depuis ${originCountry}`;
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { slug } = await params;

  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  const mainImage =
    vehicle.images.find((image) => image.isPrimary) ?? vehicle.images[0];

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <section>
          <div className="aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
            {mainImage ? (
              <img
                src={mainImage.url}
                alt={mainImage.alt ?? `${vehicle.make} ${vehicle.model}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-neutral-500">
                Aucune photo
              </div>
            )}
          </div>

          {vehicle.images.length > 1 && (
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {vehicle.images.map((image) => (
                <div
                  key={image.id}
                  className="aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100"
                >
                  <img
                    src={image.url}
                    alt={image.alt ?? `${vehicle.make} ${vehicle.model}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-8">
          <div>
            <p className="text-sm text-neutral-500">{vehicle.year}</p>

            <h1 className="text-4xl font-bold">
              {vehicle.make} {vehicle.model}
            </h1>

            {vehicle.variant && (
              <p className="mt-1 text-lg text-neutral-600">{vehicle.variant}</p>
            )}
          </div>

          <div>
            <p className="text-3xl font-semibold">
              {formatPrice(vehicle.price, vehicle.currency)}
            </p>

            <p className="mt-2 text-neutral-700">
              {getLocationLabel(
                vehicle.locationStatus,
                vehicle.congoCity,
                vehicle.originCountry,
              )}
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              {vehicle.priceBasis === "LANDED"
                ? "Prix incluant les frais d’importation pris en charge par le vendeur."
                : "Prix hors transport, transit, douane, taxes et autres frais liés à l’importation."}
            </p>

            {vehicle.priceNegotiable && (
              <p className="mt-2 text-sm font-medium">Prix négociable</p>
            )}
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div>
              <dt className="text-neutral-500">Provenance</dt>
              <dd className="font-medium">{vehicle.originCountry}</dd>
            </div>

            <div>
              <dt className="text-neutral-500">Kilométrage</dt>
              <dd className="font-medium">
                {vehicle.mileage.toLocaleString("fr-FR")} km
              </dd>
            </div>

            <div>
              <dt className="text-neutral-500">Carburant</dt>
              <dd className="font-medium">{vehicle.fuelType}</dd>
            </div>

            <div>
              <dt className="text-neutral-500">Transmission</dt>
              <dd className="font-medium">{vehicle.transmission}</dd>
            </div>

            <div>
              <dt className="text-neutral-500">Type</dt>
              <dd className="font-medium">{vehicle.bodyType}</dd>
            </div>

            {vehicle.engine && (
              <div>
                <dt className="text-neutral-500">Moteur</dt>
                <dd className="font-medium">{vehicle.engine}</dd>
              </div>
            )}

            {vehicle.power && (
              <div>
                <dt className="text-neutral-500">Puissance</dt>
                <dd className="font-medium">{vehicle.power} ch</dd>
              </div>
            )}

            {vehicle.color && (
              <div>
                <dt className="text-neutral-500">Couleur</dt>
                <dd className="font-medium">{vehicle.color}</dd>
              </div>
            )}
          </dl>

          {vehicle.description && (
            <div>
              <h2 className="text-xl font-semibold">Description</h2>

              <p className="mt-2 leading-7 text-neutral-700">
                {vehicle.description}
              </p>
            </div>
          )}

          {vehicle.features.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold">Équipements</h2>

              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {vehicle.features.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-lg bg-neutral-50 px-3 py-2 text-sm"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {vehicle.status !== "SOLD" && (
            <CustomerRequestForm vehicleId={vehicle.id} />
          )}
        </section>
      </div>
    </main>
  );
}
