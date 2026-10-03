"use client";

export default function PublicError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold">Une erreur est survenue</h1>

      <p className="mt-3 text-neutral-600">
        Impossible de charger cette page pour le moment.
      </p>

      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-black px-4 py-2 text-white"
      >
        Réessayer
      </button>
    </main>
  );
}
