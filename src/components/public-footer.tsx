import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="border-t border-(--border) bg-(--bg) text-(--muted)">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-(--text)">Auto Store</p>

          <p className="mt-3 max-w-sm text-sm text-(--muted)">
            Véhicules d&apos;occasion disponibles au Congo, en transit ou à
            l&apos;importation.
          </p>
        </div>

        <div>
          <p className="font-medium text-(--text)">Navigation</p>

          <nav className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/">Accueil</Link>

            <Link href="/vehicles">Véhicules</Link>

            <Link href="/vehicles?location=IN_CONGO">Disponibles au Congo</Link>
          </nav>
        </div>

        <div>
          <p className="font-medium text-(--text)">Provenances</p>

          <p className="mt-3 text-sm text-(--muted)">
            Japon, Chine, Émirats arabes unis, Allemagne, France, Corée du Sud
            et États-Unis.
          </p>
        </div>
      </div>

      <div className="border-t border-(--border) bg-(--bg) text-center">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-(--muted)">
          © {new Date().getFullYear()} Auto Store.
        </div>
      </div>
    </footer>
  );
}
