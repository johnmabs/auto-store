import Link from "next/link";

import {
  getAdminDashboardStats,
  getRecentCustomerRequests,
} from "@/features/admin/dashboard.queries";

export default async function AdminPage() {
  const [stats, recentRequests] = await Promise.all([
    getAdminDashboardStats(),
    getRecentCustomerRequests(),
  ]);

  const cards = [
    {
      label: "Véhicules disponibles",
      value: stats.availableVehicles,
      href: "/admin/vehicles",
    },
    {
      label: "En transit",
      value: stats.inTransitVehicles,
      href: "/admin/vehicles",
    },
    {
      label: "Véhicules réservés",
      value: stats.reservedVehicles,
      href: "/admin/vehicles",
    },
    {
      label: "Nouvelles demandes",
      value: stats.newRequests,
      href: "/admin/requests",
    },
  ];

  return (
    <section>
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>

        <p className="mt-2 text-neutral-600">
          Vue d’ensemble de l’activité Auto Store.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border bg-white p-6 transition hover:bg-neutral-50"
          >
            <p className="text-sm text-neutral-500">{card.label}</p>

            <p className="mt-3 text-3xl font-bold">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-xl border bg-white">
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="font-semibold">Dernières demandes</h2>

            <p className="mt-1 text-sm text-neutral-500">
              Les cinq demandes les plus récentes.
            </p>
          </div>

          <Link
            href="/admin/requests"
            className="text-sm underline underline-offset-4"
          >
            Voir toutes
          </Link>
        </div>

        {recentRequests.length === 0 ? (
          <div className="p-6 text-sm text-neutral-500">
            Aucune demande reçue.
          </div>
        ) : (
          <div className="divide-y">
            {recentRequests.map((request) => (
              <Link
                key={request.id}
                href={`/admin/requests/${request.id}`}
                className="flex items-center justify-between gap-4 p-5 hover:bg-neutral-50"
              >
                <div>
                  <p className="font-medium">
                    {request.firstName} {request.lastName ?? ""}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    {request.vehicle
                      ? `${request.vehicle.make} ${request.vehicle.model} ${request.vehicle.year}`
                      : "Demande générale"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm">{request.status}</p>

                  <p className="mt-1 text-xs text-neutral-500">
                    {new Intl.DateTimeFormat("fr-FR", {
                      dateStyle: "medium",
                    }).format(request.createdAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
