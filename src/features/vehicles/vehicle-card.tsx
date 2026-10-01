import Link from "next/link";
import Image from "next/image";

import {
  formatVehiclePrice,
  getVehicleLocationLabel,
} from "@/features/vehicles/vehicle.formatters";

type VehicleCardProps = {
  vehicle: {
    slug: string;
    make: string;
    model: string;
    variant: string | null;
    year: number;
    mileage: number;
    originCountry: string;
    locationStatus: "ABROAD" | "IN_TRANSIT" | "IN_CONGO";
    congoCity: "POINTE_NOIRE" | "BRAZZAVILLE" | null;
    price: number;
    currency: "XAF" | "USD" | "EUR";
    priceBasis: "VEHICLE_ONLY" | "LANDED";
    images: {
      url: string;
      alt: string | null;
    }[];
  };
  priority?: boolean;
};

export function VehicleCard({ vehicle, priority = false }: VehicleCardProps) {
  const primaryImage = vehicle.images[0];

  return (
    <article className="overflow-hidden rounded-xl border bg-white">
      <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt ?? `${vehicle.make} ${vehicle.model}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={priority ? "eager" : "lazy"}
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-500">
            Aucune photo
          </div>
        )}
      </div>

      <div className="space-y-3 p-5">
        <div>
          <p className="text-sm text-neutral-500">
            {vehicle.year} · {vehicle.mileage.toLocaleString("fr-FR")} km
          </p>

          <h2 className="text-xl font-semibold">
            {vehicle.make} {vehicle.model}
          </h2>

          {vehicle.variant && (
            <p className="text-sm text-neutral-600">{vehicle.variant}</p>
          )}
        </div>

        <div className="space-y-1">
          <p className="font-medium">
            {formatVehiclePrice(vehicle.price, vehicle.currency)}
          </p>

          <p className="text-sm text-neutral-600">
            {getVehicleLocationLabel(vehicle.locationStatus, vehicle.congoCity)}
          </p>

          <p className="text-xs text-neutral-500">
            {vehicle.priceBasis === "LANDED"
              ? "Prix avec frais d'importation inclus"
              : "Prix hors frais d'importation"}
          </p>
        </div>

        <Link
          href={`/vehicles/${vehicle.slug}`}
          className="inline-flex text-sm font-medium underline underline-offset-4"
        >
          Voir le véhicule
        </Link>
      </div>
    </article>
  );
}
