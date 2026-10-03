"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body>
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-xl text-center">
            <h1 className="text-3xl font-bold">
              Une erreur inattendue est survenue
            </h1>

            <p className="mt-3 text-neutral-600">
              L&apos;application n&apos;a pas pu terminer cette opération.
            </p>

            <button
              type="button"
              onClick={() => reset()}
              className="mt-6 rounded-lg bg-black px-4 py-2 text-white"
            >
              Réessayer
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
