import Link from "next/link";

export default function VehicleNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl font-bold">Véhicule introuvable</h1>

      <p className="mt-3 text-neutral-600">
        Ce véhicule n’existe pas ou n’est plus visible dans le catalogue.
      </p>

      <Link
        href="/vehicles"
        className="mt-6 inline-block underline underline-offset-4"
      >
        Retour au catalogue
      </Link>
    </main>
  );
}
