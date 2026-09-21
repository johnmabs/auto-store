"use client";

import type { VehicleFormState } from "./vehicle.actions";
import { VEHICLE_ORIGINS } from "./vehicle.constants";
import { VEHICLE_FEATURES } from "./vehicle-features";

export type VehicleFormValues = {
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
  features?: string[];
  doors?: number | null;
  seats?: number | null;
  featured?: boolean;
};

type VehicleFormFieldsProps = {
  action: (formData: FormData) => void;
  state: VehicleFormState;
  pending: boolean;

  values?: VehicleFormValues;
  submitLabel: string;
  showStatus?: boolean;
};

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) {
    return null;
  }

  return <p className="mt-1 text-sm text-red-600">{errors[0]}</p>;
}

export function VehicleFormFields({
  action,
  state,
  pending,
  values = {},
  submitLabel,
  showStatus = true,
}: VehicleFormFieldsProps) {
  return (
    <form action={action} className="mt-8 space-y-8" noValidate>
      <fieldset className="space-y-4 rounded-xl border bg-white p-6">
        <legend className="px-2 font-semibold">Informations générales</legend>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <input
              name="make"
              placeholder="Marque"
              defaultValue={values.make ?? ""}
              required
              className="w-full rounded-lg border px-3 py-2"
            />

            <FieldError errors={state.errors?.make} />
          </div>

          <div>
            <input
              name="model"
              placeholder="Modèle"
              defaultValue={values.model ?? ""}
              required
              className="w-full rounded-lg border px-3 py-2"
            />

            <FieldError errors={state.errors?.model} />
          </div>

          <div>
            <input
              name="variant"
              placeholder="Version"
              defaultValue={values.variant ?? ""}
              className="w-full rounded-lg border px-3 py-2"
            />

            <FieldError errors={state.errors?.variant} />
          </div>

          <div>
            <input
              name="year"
              type="number"
              placeholder="Année"
              defaultValue={values.year ?? ""}
              required
              className="w-full rounded-lg border px-3 py-2"
            />

            <FieldError errors={state.errors?.year} />
          </div>

          <div>
            <input
              name="mileage"
              type="number"
              placeholder="Kilométrage"
              defaultValue={values.mileage ?? ""}
              required
              className="w-full rounded-lg border px-3 py-2"
            />

            <FieldError errors={state.errors?.mileage} />
          </div>

          <div>
            <select
              name="bodyType"
              defaultValue={values.bodyType ?? ""}
              required
              className="w-full rounded-lg border px-3 py-2"
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

            <FieldError errors={state.errors?.bodyType} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-xl border bg-white p-6">
        <legend className="px-2 font-semibold">Caractéristiques</legend>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <select
              name="fuelType"
              defaultValue={values.fuelType ?? ""}
              required
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="">Carburant</option>
              <option value="GASOLINE">Essence</option>
              <option value="DIESEL">Diesel</option>
              <option value="HYBRID">Hybride</option>
              <option value="PLUGIN_HYBRID">Hybride rechargeable</option>
              <option value="ELECTRIC">Électrique</option>
              <option value="OTHER">Autre</option>
            </select>

            <FieldError errors={state.errors?.fuelType} />
          </div>

          <div>
            <select
              name="transmission"
              defaultValue={values.transmission ?? ""}
              required
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="">Transmission</option>
              <option value="AUTOMATIC">Automatique</option>
              <option value="MANUAL">Manuelle</option>
              <option value="CVT">CVT</option>
              <option value="DCT">DCT</option>
              <option value="OTHER">Autre</option>
            </select>

            <FieldError errors={state.errors?.transmission} />
          </div>

          <div>
            <input
              name="engine"
              placeholder="Moteur"
              defaultValue={values.engine ?? ""}
              className="w-full rounded-lg border px-3 py-2"
            />

            <FieldError errors={state.errors?.engine} />
          </div>

          <div>
            <input
              name="power"
              type="number"
              placeholder="Puissance (ch)"
              defaultValue={values.power ?? ""}
              className="w-full rounded-lg border px-3 py-2"
            />

            <FieldError errors={state.errors?.power} />
          </div>

          <div>
            <input
              name="doors"
              type="number"
              min={1}
              max={10}
              placeholder="Nombre de portes"
              defaultValue={values.doors ?? ""}
              className="w-full rounded-lg border px-3 py-2"
            />

            <FieldError errors={state.errors?.doors} />
          </div>

          <div>
            <input
              name="seats"
              type="number"
              min={1}
              max={20}
              placeholder="Nombre de places"
              defaultValue={values.seats ?? ""}
              className="w-full rounded-lg border px-3 py-2"
            />

            <FieldError errors={state.errors?.seats} />
          </div>

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
        <legend className="px-2 font-semibold">Équipements et options</legend>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {VEHICLE_FEATURES.map((feature) => (
            <label
              key={feature.value}
              className="flex items-center gap-2 rounded-lg border p-3 text-sm"
            >
              <input
                type="checkbox"
                name="features"
                value={feature.value}
                defaultChecked={
                  values.features?.includes(feature.value) ?? false
                }
              />

              {feature.label}
            </label>
          ))}
        </div>

        <FieldError errors={state.errors?.features} />
      </fieldset>

      <fieldset className="space-y-4 rounded-xl border bg-white p-6">
        <legend className="px-2 font-semibold">
          Provenance et localisation
        </legend>

        <div>
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

          <FieldError errors={state.errors?.originCountry} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <select
              name="locationStatus"
              defaultValue={values.locationStatus ?? ""}
              required
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="">Situation actuelle</option>

              <option value="ABROAD">À l&apos;étranger</option>

              <option value="IN_TRANSIT">En transit</option>

              <option value="IN_CONGO">Au Congo</option>
            </select>

            <FieldError errors={state.errors?.locationStatus} />
          </div>

          <div>
            <select
              name="congoCity"
              defaultValue={values.congoCity ?? ""}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="">Ville au Congo</option>

              <option value="POINTE_NOIRE">Pointe-Noire</option>

              <option value="BRAZZAVILLE">Brazzaville</option>
            </select>

            <FieldError errors={state.errors?.congoCity} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-xl border bg-white p-6">
        <legend className="px-2 font-semibold">Prix et publication</legend>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <input
              name="price"
              type="number"
              placeholder="Prix"
              defaultValue={values.price ?? ""}
              required
              className="w-full rounded-lg border px-3 py-2"
            />

            <FieldError errors={state.errors?.price} />
          </div>

          <div>
            <select
              name="currency"
              defaultValue={values.currency ?? "XAF"}
              required
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="XAF">FCFA</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>

            <FieldError errors={state.errors?.currency} />
          </div>

          <div>
            <select
              name="priceBasis"
              defaultValue={values.priceBasis ?? "VEHICLE_ONLY"}
              required
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="VEHICLE_ONLY">
                Hors frais d&apos;importation
              </option>

              <option value="LANDED">Frais inclus</option>
            </select>

            <FieldError errors={state.errors?.priceBasis} />
          </div>
        </div>

        {showStatus ? (
          <div>
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

            <FieldError errors={state.errors?.status} />
          </div>
        ) : (
          <input type="hidden" name="status" value="DRAFT" />
        )}

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

      {state.message && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-black px-5 py-2.5 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Enregistrement..." : submitLabel}
      </button>
    </form>
  );
}
