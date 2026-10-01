import Link from "next/link";

import {
  getVehicleMakes,
  getVehicles,
  type VehicleFilters,
} from "@/features/vehicles/vehicle.queries";
import { VehicleCard } from "@/features/vehicles/vehicle-card";

type VehiclesPageProps = {
  searchParams: Promise<{
    make?: string;
    location?: string;
    status?: string;

    fuelType?: string;
    bodyType?: string;

    minYear?: string;
    maxYear?: string;

    minPrice?: string;
    maxPrice?: string;
  }>;
};

const allowedLocations = ["ABROAD", "IN_TRANSIT", "IN_CONGO"] as const;
const allowedStatuses = ["AVAILABLE", "RESERVED", "SOLD"] as const;
const allowedFuelTypes = [
  "GASOLINE",
  "DIESEL",
  "HYBRID",
  "PLUGIN_HYBRID",
  "ELECTRIC",
  "OTHER",
] as const;
const allowedBodyTypes = [
  "SUV",
  "SEDAN",
  "HATCHBACK",
  "COUPE",
  "PICKUP",
  "MINIVAN",
  "WAGON",
  "CONVERTIBLE",
  "OTHER",
] as const;

function parseLocation(value?: string): VehicleFilters["location"] {
  if (
    value &&
    allowedLocations.includes(value as (typeof allowedLocations)[number])
  ) {
    return value as VehicleFilters["location"];
  }

  return undefined;
}

function parseStatus(value?: string): VehicleFilters["status"] {
  if (
    value &&
    allowedStatuses.includes(value as (typeof allowedStatuses)[number])
  ) {
    return value as VehicleFilters["status"];
  }

  return undefined;
}

function parseNumber(value?: string) {
  if (!value) {
    return undefined;
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return undefined;
  }

  return number;
}

function parseFuelType(value?: string): VehicleFilters["fuelType"] {
  if (
    value &&
    allowedFuelTypes.includes(value as (typeof allowedFuelTypes)[number])
  ) {
    return value as VehicleFilters["fuelType"];
  }

  return undefined;
}

function parseBodyType(value?: string): VehicleFilters["bodyType"] {
  if (
    value &&
    allowedBodyTypes.includes(value as (typeof allowedBodyTypes)[number])
  ) {
    return value as VehicleFilters["bodyType"];
  }

  return undefined;
}

export default async function VehiclesPage({
  searchParams,
}: VehiclesPageProps) {
  const params = await searchParams;

  const filters: VehicleFilters = {
    make: params.make || undefined,

    location: parseLocation(params.location),

    status: parseStatus(params.status),

    fuelType: parseFuelType(params.fuelType),

    bodyType: parseBodyType(params.bodyType),

    minYear: parseNumber(params.minYear),

    maxYear: parseNumber(params.maxYear),

    minPrice: parseNumber(params.minPrice),

    maxPrice: parseNumber(params.maxPrice),
  };

  const [vehicles, makes] = await Promise.all([
    getVehicles(filters),
    getVehicleMakes(),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Nos véhicules</h1>

        <p className="mt-2 max-w-2xl text-neutral-600">
          Découvrez nos véhicules d’occasion disponibles au Congo ou à
          l’importation.
        </p>
      </header>

      <form
        action="/vehicles"
        method="get"
        className="mb-10 grid gap-4 rounded-xl border p-5 md:grid-cols-2 lg:grid-cols-4"
      >
        <div>
          <label htmlFor="make" className="mb-1 block text-sm font-medium">
            Marque
          </label>

          <select
            id="make"
            name="make"
            defaultValue={filters.make ?? ""}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="">Toutes les marques</option>

            {makes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="location" className="mb-1 block text-sm font-medium">
            Localisation
          </label>

          <select
            id="location"
            name="location"
            defaultValue={filters.location ?? ""}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="">Toutes</option>
            <option value="ABROAD">À l&apos;étranger</option>
            <option value="IN_TRANSIT">En transit</option>
            <option value="IN_CONGO">Au Congo</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-medium">
            Statut
          </label>

          <select
            id="status"
            name="status"
            defaultValue={filters.status ?? "AVAILABLE"}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="AVAILABLE">Disponible</option>
            <option value="RESERVED">Réservé</option>
            <option value="SOLD">Vendu</option>
          </select>
        </div>

        <div>
          <label htmlFor="fuelType" className="mb-1 block text-sm font-medium">
            Carburant
          </label>

          <select
            id="fuelType"
            name="fuelType"
            defaultValue={filters.fuelType ?? ""}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="">Tous</option>

            <option value="GASOLINE">Essence</option>

            <option value="DIESEL">Diesel</option>

            <option value="HYBRID">Hybride</option>

            <option value="PLUGIN_HYBRID">Hybride rechargeable</option>

            <option value="ELECTRIC">Électrique</option>

            <option value="OTHER">Autre</option>
          </select>
        </div>

        <div>
          <label htmlFor="bodyType" className="mb-1 block text-sm font-medium">
            Carrosserie
          </label>

          <select
            id="bodyType"
            name="bodyType"
            defaultValue={filters.bodyType ?? ""}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="">Toutes</option>

            <option value="SUV">SUV</option>

            <option value="SEDAN">Berline</option>

            <option value="HATCHBACK">Compacte</option>

            <option value="COUPE">Coupé</option>

            <option value="PICKUP">Pick-up</option>

            <option value="MINIVAN">Minivan</option>

            <option value="WAGON">Break</option>

            <option value="CONVERTIBLE">Cabriolet</option>

            <option value="OTHER">Autre</option>
          </select>
        </div>

        <div>
          <label htmlFor="minYear" className="mb-1 block text-sm font-medium">
            Année min.
          </label>

          <input
            id="minYear"
            name="minYear"
            type="number"
            min={1950}
            defaultValue={filters.minYear ?? ""}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="maxYear" className="mb-1 block text-sm font-medium">
            Année max.
          </label>

          <input
            id="maxYear"
            name="maxYear"
            type="number"
            min={1950}
            defaultValue={filters.maxYear ?? ""}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="minPrice" className="mb-1 block text-sm font-medium">
            Prix min.
          </label>

          <input
            id="minPrice"
            name="minPrice"
            type="number"
            min={0}
            step={100000}
            defaultValue={filters.minPrice ?? ""}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="maxPrice" className="mb-1 block text-sm font-medium">
            Prix max.
          </label>

          <input
            id="maxPrice"
            name="maxPrice"
            type="number"
            min={0}
            step={100000}
            defaultValue={filters.maxPrice ?? ""}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div className="flex items-end gap-2">
          <button
            type="submit"
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Filtrer
          </button>

          <Link href="/vehicles" className="rounded-lg border px-4 py-2">
            Réinitialiser
          </Link>
        </div>
      </form>

      <p className="mb-6 text-sm text-neutral-600">
        {vehicles.length} véhicule
        {vehicles.length > 1 ? "s" : ""}
      </p>

      {vehicles.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          <p className="font-medium">
            Aucun véhicule ne correspond à ces critères.
          </p>

          <Link
            href="/vehicles"
            className="mt-3 inline-block underline underline-offset-4"
          >
            Voir tous les véhicules disponibles
          </Link>
        </div>
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
