import { createVehicle } from "@/features/vehicles/vehicle.actions";

export default function NewVehiclePage() {
  return (
    <section className="max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Ajouter un véhicule</h1>

        <p className="mt-2 text-neutral-600">
          Enregistrer un nouveau véhicule dans le catalogue.
        </p>
      </div>

      <form action={createVehicle} className="mt-8 space-y-8">
        <fieldset className="space-y-4 rounded-xl border bg-white p-6">
          <legend className="px-2 font-semibold">Informations générales</legend>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="make"
              placeholder="Marque"
              required
              className="rounded-lg border px-3 py-2"
            />

            <input
              name="model"
              placeholder="Modèle"
              required
              className="rounded-lg border px-3 py-2"
            />

            <input
              name="variant"
              placeholder="Version"
              className="rounded-lg border px-3 py-2"
            />

            <input
              name="year"
              type="number"
              placeholder="Année"
              required
              className="rounded-lg border px-3 py-2"
            />

            <input
              name="mileage"
              type="number"
              placeholder="Kilométrage"
              required
              className="rounded-lg border px-3 py-2"
            />

            <select
              name="bodyType"
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
              className="rounded-lg border px-3 py-2"
            />

            <input
              name="power"
              type="number"
              placeholder="Puissance (ch)"
              className="rounded-lg border px-3 py-2"
            />

            <input
              name="color"
              placeholder="Couleur extérieure"
              className="rounded-lg border px-3 py-2"
            />

            <input
              name="interiorColor"
              placeholder="Couleur intérieure"
              className="rounded-lg border px-3 py-2"
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4 rounded-xl border bg-white p-6">
          <legend className="px-2 font-semibold">
            Provenance et localisation
          </legend>

          <input
            name="originCountry"
            placeholder="Pays de provenance"
            required
            className="w-full rounded-lg border px-3 py-2"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <select
              name="locationStatus"
              required
              className="rounded-lg border px-3 py-2"
            >
              <option value="">Situation actuelle</option>
              <option value="ABROAD">À l&apos;étranger</option>
              <option value="IN_TRANSIT">En transit</option>
              <option value="IN_CONGO">Au Congo</option>
            </select>

            <select name="congoCity" className="rounded-lg border px-3 py-2">
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
              required
              className="rounded-lg border px-3 py-2"
            />

            <select
              name="currency"
              required
              className="rounded-lg border px-3 py-2"
            >
              <option value="XAF">FCFA</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>

            <select
              name="priceBasis"
              required
              className="rounded-lg border px-3 py-2"
            >
              <option value="VEHICLE_ONLY">
                Hors frais d&apos;importation
              </option>
              <option value="LANDED">Frais inclus</option>
            </select>
          </div>

          <select
            name="status"
            defaultValue="DRAFT"
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
            className="w-full rounded-lg border px-3 py-2"
          />

          <label className="flex items-center gap-2">
            <input type="checkbox" name="priceNegotiable" />
            Prix négociable
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" name="featured" />
            Mettre en avant
          </label>
        </fieldset>

        <button
          type="submit"
          className="rounded-lg bg-black px-5 py-2.5 text-white"
        >
          Enregistrer le véhicule
        </button>
      </form>
    </section>
  );
}
