import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-(--bg)">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_70%_45%,rgba(201,168,76,0.12),transparent_35%),linear-gradient(135deg,#0a0a0b_0%,#111114_55%,#0a0a0b_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-gold-500/40 to-transparent"
      />

      <div className="mx-auto grid min-h-180 max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/5 px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />

            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold-400">
              Vente & importation automobile
            </span>
          </div>

          <h1 className="mt-8 max-w-4xl font-display text-5xl leading-[0.95] tracking-wide text-(--text) sm:text-6xl lg:text-7xl">
            TROUVEZ VOTRE
            <span className="block text-gold-500">PROCHAIN VÉHICULE</span>
            AU CONGO
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-(--muted) sm:text-lg">
            Des véhicules d&apos;occasion disponibles à Pointe-Noire et
            Brazzaville, en transit ou accessibles à l&apos;importation depuis
            nos marchés partenaires.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/vehicles"
              className="group inline-flex items-center gap-3 rounded-xl bg-gold-500 px-6 py-3.5 text-sm font-bold text-(--muted) transition hover:bg-gold-400"
            >
              Voir les véhicules
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            <Link
              href="/vehicles?location=IN_CONGO"
              className="inline-flex items-center rounded-xl border border-(--border) bg-(--bg) px-6 py-3.5 text-sm font-semibold text-(--text) transition hover:border-gold-500/40 hover:bg-(--bg)/50"
            >
              Disponibles au Congo
            </Link>
          </div>

          <form
            action="/vehicles"
            method="get"
            className="mt-10 flex max-w-xl overflow-hidden rounded-xl border border-(--border) bg-(--bg)"
          >
            <label htmlFor="hero-search" className="sr-only">
              Rechercher un véhicule
            </label>

            <input
              id="hero-search"
              name="q"
              type="search"
              placeholder="Toyota Prado, BMW X5, Mercedes..."
              className="min-w-0 flex-1 bg-transparent px-5 py-4 text-sm text-(--text) outline-none placeholder:text-(--muted)"
            />

            <button
              type="submit"
              className="border-l border-(--border) px-6 text-sm font-semibold text-gold-400 transition hover:bg-(--bg)/50"
            >
              Rechercher
            </button>
          </form>

          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-(--border) pt-7">
            <div>
              <p className="font-display text-2xl text-(--text)">CONGO</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-(--muted)">
                Stock local
              </p>
            </div>

            <div>
              <p className="font-display text-2xl text-(--text)">IMPORT</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-(--muted)">
                Marchés internationaux
              </p>
            </div>

            <div>
              <p className="font-display text-2xl text-(--text)">SUIVI</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-(--muted)">
                Jusqu&apos;à la livraison
              </p>
            </div>
          </div>
        </div>

        <div className="relative hidden min-h-130 lg:block">
          <div className="absolute inset-8 rounded-[3rem] border border-gold-500/10 bg-linear-to-br from-gold-500/10 via-transparent to-transparent" />

          <div className="absolute left-8 top-14 w-[80%] rounded-3xl border border-(--border) bg-(--bg) p-7 shadow-2xl backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-500">
              Auto Store
            </p>

            <p className="mt-4 font-display text-5xl leading-none text-(--text)">
              VÉHICULES
              <br />
              SÉLECTIONNÉS
            </p>

            <p className="mt-5 max-w-sm text-sm leading-6 text-(--muted)">
              Des modèles choisis selon leur état, leur provenance et leur
              pertinence pour le marché congolais.
            </p>
          </div>

          <div className="absolute bottom-14 right-0 w-[72%] rounded-2xl border border-gold-500/20 bg-gold-500 p-6 text-(--bg) shadow-2xl">
            <p className="text-xs font-bold uppercase tracking-widest">
              Importation
            </p>

            <p className="mt-3 font-display text-4xl leading-none">
              DU MARCHÉ
              <br />À LA ROUTE.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
