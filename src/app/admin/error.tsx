"use client";

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="max-w-2xl">
      <h1 className="text-3xl font-bold">Erreur dans l&apos;administration</h1>

      <p className="mt-3 text-neutral-600">
        Une erreur inattendue empêche l&apos;affichage de cette section.
      </p>

      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-black px-4 py-2 text-white"
      >
        Réessayer
      </button>
    </section>
  );
}
