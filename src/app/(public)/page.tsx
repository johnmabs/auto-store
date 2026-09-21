import Link from "next/link";

import { VehicleCard } from "@/features/vehicles/vehicle-card";
import { getFeaturedVehicles } from "@/features/vehicles/vehicle.queries";

export default async function HomePage() {
  const featuredVehicles = await getFeaturedVehicles(6);

  return (
    <main>
      <section className="bg-neutral-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
              Auto Store
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Votre prochain véhicule, au Congo ou à l&apos;importation.
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-neutral-300">
              Découvrez une sélection de véhicules d&apos;occasion disponibles
              localement, en transit ou directement depuis nos marchés
              partenaires à l&apos;étranger.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/vehicles"
                className="rounded-lg bg-white px-5 py-3 font-medium text-black"
              >
                Voir les véhicules
              </Link>

              <Link
                href="/vehicles?location=IN_CONGO"
                className="rounded-lg border border-neutral-700 px-5 py-3 font-medium"
              >
                Disponibles au Congo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold">Véhicules en vedette</h2>

            <p className="mt-2 text-neutral-600">
              Une sélection de véhicules actuellement disponibles.
            </p>
          </div>

          <Link
            href="/vehicles"
            className="hidden text-sm underline underline-offset-4 sm:block"
          >
            Voir tout le catalogue
          </Link>
        </div>

        {featuredVehicles.length === 0 ? (
          <div className="mt-8 rounded-xl border p-8 text-center text-neutral-500">
            Aucun véhicule mis en avant pour le moment.
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}

        <div className="mt-8 sm:hidden">
          <Link href="/vehicles" className="underline underline-offset-4">
            Voir tout le catalogue
          </Link>
        </div>
      </section>

      <section className="border-y bg-neutral-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-3">
          <div>
            <h3 className="font-semibold">Véhicules au Congo</h3>

            <p className="mt-2 text-sm text-neutral-600">
              Retrouvez les véhicules déjà disponibles à Pointe-Noire ou
              Brazzaville.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Véhicules en transit</h3>

            <p className="mt-2 text-sm text-neutral-600">
              Suivez les véhicules déjà en route vers le Congo.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Importation</h3>

            <p className="mt-2 text-sm text-neutral-600">
              Accédez à des véhicules encore disponibles sur nos marchés de
              provenance.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
