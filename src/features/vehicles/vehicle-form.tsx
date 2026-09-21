import { VEHICLE_ORIGINS } from "./vehicle.constants";

type VehicleFormValues = {
  make?: string;
  model?: string;
  variant?: string | null;

  year?: number;
  mileage?: number;

  bodyType?: string;
  fuelType?: string;
  transmission?: string;

  engine?: string | null;
  power?: number | null;

  color?: string | null;
  interiorColor?: string | null;

  originCountry?: string;

  locationStatus?: string;
  congoCity?: string | null;

  price?: number;
  currency?: string;
  priceBasis?: string;

  priceNegotiable?: boolean;
  status?: string;

  description?: string | null;
  featured?: boolean;
};

type VehicleFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  values?: VehicleFormValues;
  submitLabel: string;
};

export function VehicleForm({
  action,
  values = {},
  submitLabel,
}: VehicleFormProps) {
  return (
    <form action={action} className="mt-8 space-y-8">
      <fieldset className="space-y-4 rounded-xl border bg-white p-6">
        <legend className="px-2 font-semibold">Informations générales</legend>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            name="make"
            placeholder="Marque"
            defaultValue={values.make ?? ""}
            required
            className="rounded-lg border px-3 py-2"
          />

          <input
            name="model"
            placeholder="Modèle"
            defaultValue={values.model ?? ""}
            required
            className="rounded-lg border px-3 py-2"
          />

          <input
            name="variant"
            placeholder="Version"
            defaultValue={values.variant ?? ""}
            className="rounded-lg border px-3 py-2"
          />

          <input
            name="year"
            type="number"
            placeholder="Année"
            defaultValue={values.year ?? ""}
            required
            className="rounded-lg border px-3 py-2"
          />

          <input
            name="mileage"
            type="number"
            placeholder="Kilométrage"
            defaultValue={values.mileage ?? ""}
            required
            className="rounded-lg border px-3 py-2"
          />

          <select
            name="bodyType"
            defaultValue={values.bodyType ?? ""}
            required
            className="rounded-lg border px-3 py-2"
          >
            <option value="">Carrosserie</option>
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
      </fieldset>

      <fieldset className="space-y-4 rounded-xl border bg-white p-6">
        <legend className="px-2 font-semibold">Caractéristiques</legend>

        <div className="grid gap-4 md:grid-cols-2">
          <select
            name="fuelType"
            defaultValue={values.fuelType ?? ""}
            required
            className="rounded-lg border px-3 py-2"
          >
            <option value="">Carburant</option>
            <option value="GASOLINE">Essence</option>
            <option value="DIESEL">Diesel</option>
            <option value="HYBRID">Hybride</option>
            <option value="PLUGIN_HYBRID">Hybride rechargeable</option>
            <option value="ELECTRIC">Électrique</option>
            <option value="OTHER">Autre</option>
          </select>

          <select
            name="transmission"
            defaultValue={values.transmission ?? ""}
            required
            className="rounded-lg border px-3 py-2"
          >
            <option value="">Transmission</option>
            <option value="AUTOMATIC">Automatique</option>
            <option value="MANUAL">Manuelle</option>
            <option value="CVT">CVT</option>
            <option value="DCT">DCT</option>
            <option value="OTHER">Autre</option>
          </select>

          <input
            name="engine"
            placeholder="Moteur"
            defaultValue={values.engine ?? ""}
            className="rounded-lg border px-3 py-2"
          />

          <input
            name="power"
            type="number"
            placeholder="Puissance (ch)"
            defaultValue={values.power ?? ""}
            className="rounded-lg border px-3 py-2"
          />

          <input
            name="color"
            placeholder="Couleur extérieure"
            defaultValue={values.color ?? ""}
            className="rounded-lg border px-3 py-2"
          />

          <input
            name="interiorColor"
            placeholder="Couleur intérieure"
            defaultValue={values.interiorColor ?? ""}
            className="rounded-lg border px-3 py-2"
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-xl border bg-white p-6">
        <legend className="px-2 font-semibold">
          Provenance et localisation
        </legend>

        <select
          name="originCountry"
          required
          defaultValue={values.originCountry ?? ""}
          className="w-full rounded-lg border px-3 py-2"
        >
          <option value="" disabled>
            Pays de provenance
          </option>

          {VEHICLE_ORIGINS.map((origin) => (
            <option key={origin.value} value={origin.value}>
              {origin.flag} {origin.label}
            </option>
          ))}
        </select>

        <div className="grid gap-4 md:grid-cols-2">
          <select
            name="locationStatus"
            defaultValue={values.locationStatus ?? ""}
            required
            className="rounded-lg border px-3 py-2"
          >
            <option value="">Situation actuelle</option>
            <option value="ABROAD">À l&apos;étranger</option>
            <option value="IN_TRANSIT">En transit</option>
            <option value="IN_CONGO">Au Congo</option>
          </select>

          <select
            name="congoCity"
            defaultValue={values.congoCity ?? ""}
            className="rounded-lg border px-3 py-2"
          >
            <option value="">Ville au Congo</option>
            <option value="POINTE_NOIRE">Pointe-Noire</option>
            <option value="BRAZZAVILLE">Brazzaville</option>
          </select>
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-xl border bg-white p-6">
        <legend className="px-2 font-semibold">Prix et publication</legend>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            name="price"
            type="number"
            placeholder="Prix"
            defaultValue={values.price ?? ""}
            required
            className="rounded-lg border px-3 py-2"
          />

          <select
            name="currency"
            defaultValue={values.currency ?? "XAF"}
            required
            className="rounded-lg border px-3 py-2"
          >
            <option value="XAF">FCFA</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>

          <select
            name="priceBasis"
            defaultValue={values.priceBasis ?? "VEHICLE_ONLY"}
            required
            className="rounded-lg border px-3 py-2"
          >
            <option value="VEHICLE_ONLY">Hors frais d&apos;importation</option>

            <option value="LANDED">Frais inclus</option>
          </select>
        </div>

        <select
          name="status"
          defaultValue={values.status ?? "DRAFT"}
          className="rounded-lg border px-3 py-2"
        >
          <option value="DRAFT">Brouillon</option>
          <option value="AVAILABLE">Disponible</option>
          <option value="RESERVED">Réservé</option>
          <option value="SOLD">Vendu</option>
        </select>

        <textarea
          name="description"
          rows={5}
          placeholder="Description"
          defaultValue={values.description ?? ""}
          className="w-full rounded-lg border px-3 py-2"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="priceNegotiable"
            defaultChecked={values.priceNegotiable ?? false}
          />
          Prix négociable
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={values.featured ?? false}
          />
          Mettre en avant
        </label>
      </fieldset>

      <button
        type="submit"
        className="rounded-lg bg-black px-5 py-2.5 text-white"
      >
        {submitLabel}
      </button>
    </form>
  );
}
