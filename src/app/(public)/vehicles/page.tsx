import Link from "next/link";

import {
  getVehicleMakes,
  getVehicles,
  type VehicleFilters,
} from "@/features/vehicles/vehicle.queries";
import { VehicleCard } from "@/features/vehicles/vehicle-card";
import { VehicleFiltersPanel } from "@/features/vehicles/vehicle-filters-panel";

type VehiclesPageProps = {
  searchParams: Promise<{
    q?: string;
    make?: string;
    location?: string;
    status?: string;
    fuelType?: string;
    bodyType?: string;
    minYear?: string;
    maxYear?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    page?: string;
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

const allowedSorts = [
  "recent",
  "price_asc",
  "price_desc",
  "year_desc",
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

function parseSort(value?: string): VehicleFilters["sort"] {
  if (value && allowedSorts.includes(value as (typeof allowedSorts)[number])) {
    return value as VehicleFilters["sort"];
  }

  return "recent";
}

function parsePage(value?: string) {
  const page = Number(value);

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
}

function buildPageHref(
  params: Record<string, string | undefined>,
  page: number,
) {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value && key !== "page") {
      search.set(key, value);
    }
  }

  search.set("page", String(page));

  return `/vehicles?${search.toString()}`;
}

function buildRemoveFilterHref(
  params: Record<string, string | undefined>,
  keyToRemove: string,
) {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value && key !== keyToRemove && key !== "page") {
      search.set(key, value);
    }
  }

  const query = search.toString();

  return query ? `/vehicles?${query}` : "/vehicles";
}

function getFuelFilterLabel(value: VehicleFilters["fuelType"]) {
  switch (value) {
    case "GASOLINE":
      return "Essence";

    case "DIESEL":
      return "Diesel";

    case "HYBRID":
      return "Hybride";

    case "PLUGIN_HYBRID":
      return "Hybride rechargeable";

    case "ELECTRIC":
      return "Électrique";

    case "OTHER":
      return "Autre";

    default:
      return "";
  }
}

function getBodyTypeFilterLabel(value: VehicleFilters["bodyType"]) {
  switch (value) {
    case "SUV":
      return "SUV";

    case "SEDAN":
      return "Berline";

    case "HATCHBACK":
      return "Compacte";

    case "COUPE":
      return "Coupé";

    case "PICKUP":
      return "Pick-up";

    case "MINIVAN":
      return "Minivan";

    case "WAGON":
      return "Break";

    case "CONVERTIBLE":
      return "Cabriolet";

    case "OTHER":
      return "Autre";

    default:
      return "";
  }
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
    sort: parseSort(params.sort),
    page: parsePage(params.page),
    search: params.q?.trim() || undefined,
  };

  const [vehicleResult, makes] = await Promise.all([
    getVehicles(filters),
    getVehicleMakes(),
  ]);

  const { vehicles, pagination } = vehicleResult;

  const activeFilters: {
    key: string;
    label: string;
  }[] = [];

  if (filters.search) {
    activeFilters.push({
      key: "q",
      label: `Recherche : ${filters.search}`,
    });
  }

  if (filters.make) {
    activeFilters.push({
      key: "make",
      label: filters.make,
    });
  }

  if (filters.location) {
    activeFilters.push({
      key: "location",
      label:
        filters.location === "IN_CONGO"
          ? "Au Congo"
          : filters.location === "IN_TRANSIT"
            ? "En transit"
            : "À l'étranger",
    });
  }

  if (filters.fuelType) {
    activeFilters.push({
      key: "fuelType",
      label: getFuelFilterLabel(filters.fuelType),
    });
  }

  if (filters.bodyType) {
    activeFilters.push({
      key: "bodyType",
      label: getBodyTypeFilterLabel(filters.bodyType),
    });
  }

  if (filters.minYear !== undefined) {
    activeFilters.push({
      key: "minYear",
      label: `À partir de ${filters.minYear}`,
    });
  }

  if (filters.maxYear !== undefined) {
    activeFilters.push({
      key: "maxYear",
      label: `Jusqu'à ${filters.maxYear}`,
    });
  }

  if (filters.minPrice !== undefined) {
    activeFilters.push({
      key: "minPrice",
      label: `Min. ${new Intl.NumberFormat("fr-FR").format(
        filters.minPrice,
      )} FCFA`,
    });
  }

  if (filters.maxPrice !== undefined) {
    activeFilters.push({
      key: "maxPrice",
      label: `Max. ${new Intl.NumberFormat("fr-FR").format(
        filters.maxPrice,
      )} FCFA`,
    });
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Nos véhicules</h1>

        <p className="mt-2 max-w-2xl text-neutral-600">
          Découvrez nos véhicules d’occasion disponibles au Congo ou à
          l’importation.
        </p>
      </header>
      <VehicleFiltersPanel activeCount={activeFilters.length}>
        <form
          action="/vehicles"
          method="get"
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          <div className="md:col-span-2 lg:col-span-2">
            <label htmlFor="q" className="mb-1 block text-sm font-medium">
              Rechercher
            </label>

            <input
              id="q"
              name="q"
              type="search"
              defaultValue={filters.search ?? ""}
              placeholder="Marque, modèle ou version..."
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
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
            <label
              htmlFor="location"
              className="mb-1 block text-sm font-medium"
            >
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
            <label
              htmlFor="fuelType"
              className="mb-1 block text-sm font-medium"
            >
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
            <label
              htmlFor="bodyType"
              className="mb-1 block text-sm font-medium"
            >
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
            <label htmlFor="sort" className="mb-1 block text-sm font-medium">
              Trier par
            </label>

            <select
              id="sort"
              name="sort"
              defaultValue={filters.sort ?? "recent"}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="recent">Plus récents</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
              <option value="year_desc">Année la plus récente</option>
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
            <label
              htmlFor="minPrice"
              className="mb-1 block text-sm font-medium"
            >
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
            <label
              htmlFor="maxPrice"
              className="mb-1 block text-sm font-medium"
            >
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
      </VehicleFiltersPanel>
      {activeFilters.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm text-neutral-500">Filtres actifs :</span>

          {activeFilters.map((filter) => (
            <Link
              key={filter.key}
              href={buildRemoveFilterHref(params, filter.key)}
              className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-sm hover:bg-neutral-50"
            >
              <span>{filter.label}</span>

              <span aria-hidden="true" className="text-neutral-400">
                ×
              </span>
            </Link>
          ))}

          <Link
            href="/vehicles"
            className="ml-1 text-sm underline underline-offset-4"
          >
            Tout effacer
          </Link>
        </div>
      )}

      <p className="mb-6 text-sm text-neutral-600">
        {pagination.total} véhicule
        {pagination.total > 1 ? "s" : ""}
        {filters.search
          ? ` trouvé${pagination.total > 1 ? "s" : ""} pour « ${filters.search} »`
          : ""}
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
          {vehicles.map((vehicle, index) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              priority={index === 0}
            />
          ))}
        </div>
      )}

      {pagination.totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-10 flex items-center justify-center gap-2"
        >
          {pagination.page > 1 && (
            <Link
              href={buildPageHref(params, pagination.page - 1)}
              className="rounded-lg border px-4 py-2 text-sm"
            >
              Précédent
            </Link>
          )}

          <span className="px-3 text-sm text-neutral-600">
            Page {pagination.page} sur {pagination.totalPages}
          </span>

          {pagination.page < pagination.totalPages && (
            <Link
              href={buildPageHref(params, pagination.page + 1)}
              className="rounded-lg border px-4 py-2 text-sm"
            >
              Suivant
            </Link>
          )}
        </nav>
      )}
    </main>
  );
}
