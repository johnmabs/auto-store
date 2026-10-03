import Link from "next/link";

export default function PublicNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
        404
      </p>

      <h1 className="mt-3 text-3xl font-bold">Page introuvable</h1>

      <p className="mt-3 text-neutral-600">
        La page demandée n&apos;existe pas ou n&apos;est plus disponible.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-lg bg-black px-4 py-2 text-white">
          Retour à l&apos;accueil
        </Link>

        <Link href="/vehicles" className="rounded-lg border px-4 py-2">
          Voir les véhicules
        </Link>
      </div>
    </main>
  );
}
