import Link from "next/link";

export default function AdminNotFound() {
  return (
    <section className="max-w-2xl">
      <h1 className="text-3xl font-bold">Ressource introuvable</h1>

      <p className="mt-3 text-neutral-600">
        L&apos;élément demandé n&apos;existe pas ou a été supprimé.
      </p>

      <Link
        href="/admin"
        className="mt-6 inline-block rounded-lg bg-black px-4 py-2 text-white"
      >
        Retour au tableau de bord
      </Link>
    </section>
  );
}
