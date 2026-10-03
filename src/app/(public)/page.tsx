import Link from "next/link";
import type { Metadata } from "next";

import { HeroSection } from "@/features/home/hero-section";

import { VehicleCard } from "@/features/vehicles/vehicle-card";
import { getFeaturedVehicles } from "@/features/vehicles/vehicle.queries";

export const metadata: Metadata = {
  title: "Véhicules d'occasion au Congo et à l'importation",

  description:
    "Auto Store propose des véhicules d'occasion disponibles à Pointe-Noire, Brazzaville, en transit ou à l'importation.",
};

export default async function HomePage() {
  const featuredVehicles = await getFeaturedVehicles(6);

  return (
    <main>
      <HeroSection />

      <section className="bg-(--bg) px-6 py-24">
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold">Véhicules en vedette</h2>

              <p className="mt-2 text-(--muted)">
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
              {featuredVehicles.map((vehicle, index) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  priority={index === 0}
                />
              ))}
            </div>
          )}

          <div className="mt-8 sm:hidden">
            <Link href="/vehicles" className="underline underline-offset-4">
              Voir tout le catalogue
            </Link>
          </div>
        </section>
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
