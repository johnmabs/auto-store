import { VEHICLE_ORIGINS } from "./vehicle.constants";

export function formatVehiclePrice(
  price: number,
  currency: "XAF" | "USD" | "EUR",
) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getVehicleStatusLabel(
  status: "DRAFT" | "AVAILABLE" | "RESERVED" | "SOLD",
) {
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

export function getVehicleLocationLabel(
  locationStatus: "ABROAD" | "IN_TRANSIT" | "IN_CONGO",
  congoCity: "POINTE_NOIRE" | "BRAZZAVILLE" | null,
) {
  switch (locationStatus) {
    case "ABROAD":
      return "À l'étranger";

    case "IN_TRANSIT":
      return "En transit";

    case "IN_CONGO":
      if (congoCity === "POINTE_NOIRE") {
        return "Pointe-Noire";
      }

      if (congoCity === "BRAZZAVILLE") {
        return "Brazzaville";
      }

      return "Au Congo";
  }
}

export function getVehicleOrigin(value: string) {
  return VEHICLE_ORIGINS.find((origin) => origin.value === value);
}

export function getVehicleOriginLabel(value: string) {
  const origin = getVehicleOrigin(value);

  if (!origin) {
    return value;
  }

  return `${origin.flag} ${origin.label}`;
}

export function getFuelTypeLabel(
  fuelType:
    | "GASOLINE"
    | "DIESEL"
    | "HYBRID"
    | "PLUGIN_HYBRID"
    | "ELECTRIC"
    | "OTHER",
) {
  switch (fuelType) {
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
  }
}

export function getTransmissionLabel(
  transmission: "AUTOMATIC" | "MANUAL" | "CVT" | "DCT" | "OTHER",
) {
  switch (transmission) {
    case "AUTOMATIC":
      return "Automatique";

    case "MANUAL":
      return "Manuelle";

    case "CVT":
      return "CVT";

    case "DCT":
      return "DCT";

    case "OTHER":
      return "Autre";
  }
}
