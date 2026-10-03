import Link from "next/link";
import { notFound } from "next/navigation";

import {
  CustomerRequestFilters,
  getAdminCustomerRequests,
  getRequestVehicleOptions,
} from "@/features/requests/request.queries";
import { getCustomerRequestStatusLabel } from "@/features/requests/request.formatters";
import { RequestStatusActions } from "@/features/requests/request-status-actions";

type AdminRequestsPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
    vehicleId?: string;
    page?: string;
  }>;
};

const allowedStatuses = ["NEW", "CONTACTED", "CLOSED"] as const;

function parseStatus(value?: string): CustomerRequestFilters["status"] {
  if (
    value &&
    allowedStatuses.includes(value as (typeof allowedStatuses)[number])
  ) {
    return value as CustomerRequestFilters["status"];
  }

  return undefined;
}

function parsePage(value?: string) {
  const page = Number(value);

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
}

function buildPageHref(
  params: Record<string, string | undefined>,
  page: number,
) {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value && key !== "page") {
      search.set(key, value);
    }
  }

  search.set("page", String(page));

  return `/admin/requests?${search.toString()}`;
}

export default async function AdminRequestsPage({
  searchParams,
}: AdminRequestsPageProps) {
  const params = await searchParams;

  const filters: CustomerRequestFilters = {
    search: params.q?.trim() || undefined,

    status: parseStatus(params.status),

    vehicleId: params.vehicleId || undefined,

    page: parsePage(params.page),
  };

  const [result, vehicles] = await Promise.all([
    getAdminCustomerRequests(filters),
    getRequestVehicleOptions(),
  ]);

  const { requests, pagination } = result;

  if (!requests) {
    notFound();
  }

  return (
    <section>
      <div>
        <h1 className="text-3xl font-bold">Demandes clients</h1>

        <p className="mt-2 text-neutral-600">
          Suivi des demandes reçues depuis le site.
        </p>
      </div>

      <form
        action="/admin/requests"
        method="get"
        className="mt-8 grid gap-4 rounded-xl border bg-white p-5 md:grid-cols-2 xl:grid-cols-4"
      >
        <div>
          <label htmlFor="q" className="mb-1 block text-sm font-medium">
            Rechercher
          </label>

          <input
            id="q"
            name="q"
            type="search"
            defaultValue={filters.search ?? ""}
            placeholder="Nom, téléphone ou email"
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-medium">
            Statut
          </label>

          <select
            id="status"
            name="status"
            defaultValue={filters.status ?? ""}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="">Tous les statuts</option>

            <option value="NEW">Nouvelles</option>

            <option value="CONTACTED">Contactées</option>

            <option value="CLOSED">Clôturées</option>
          </select>
        </div>

        <div>
          <label htmlFor="vehicleId" className="mb-1 block text-sm font-medium">
            Véhicule
          </label>

          <select
            id="vehicleId"
            name="vehicleId"
            defaultValue={filters.vehicleId ?? ""}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="">Tous les véhicules</option>

            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.make} {vehicle.model} {vehicle.year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end gap-2">
          <button
            type="submit"
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Filtrer
          </button>

          <Link href="/admin/requests" className="rounded-lg border px-4 py-2">
            Réinitialiser
          </Link>
        </div>
      </form>

      <p className="mt-6 text-sm text-neutral-500">
        {pagination.total} demande
        {pagination.total > 1 ? "s" : ""}
      </p>
      <div className="mt-8 overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-neutral-50">
            <tr>
              <th className="px-4 py-3 font-medium">Client</th>

              <th className="px-4 py-3 font-medium">Contact</th>

              <th className="px-4 py-3 font-medium">Véhicule</th>

              <th className="px-4 py-3 font-medium">Statut</th>

              <th className="px-4 py-3 font-medium">Date</th>

              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-b last:border-b-0">
                <td className="px-4 py-3">
                  <p className="font-medium">
                    {request.firstName} {request.lastName ?? ""}
                  </p>
                </td>

                <td className="px-4 py-3">
                  <p>{request.phone}</p>

                  {request.email && (
                    <p className="text-xs text-neutral-500">{request.email}</p>
                  )}
                </td>

                <td className="px-4 py-3">
                  {request.vehicle ? (
                    <Link
                      href={`/admin/vehicles/${request.vehicle.id}/edit`}
                      className="underline underline-offset-4"
                    >
                      {request.vehicle.make} {request.vehicle.model}{" "}
                      {request.vehicle.year}
                    </Link>
                  ) : (
                    <span className="text-neutral-500">Demande générale</span>
                  )}
                </td>

                <td className="px-4 py-3">
                  {getCustomerRequestStatusLabel(request.status)}
                </td>

                <td className="px-4 py-3">
                  {new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(request.createdAt)}
                </td>

                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <RequestStatusActions
                      requestId={request.id}
                      status={request.status}
                    />

                    <Link
                      href={`/admin/requests/${request.id}`}
                      className="rounded border px-3 py-1 text-xs"
                    >
                      Voir
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pagination.totalPages > 1 && (
          <nav
            aria-label="Pagination des demandes"
            className="mt-6 flex items-center justify-center gap-3"
          >
            {pagination.page > 1 && (
              <Link
                href={buildPageHref(params, pagination.page - 1)}
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Précédent
              </Link>
            )}

            <span className="text-sm text-neutral-600">
              Page {pagination.page} sur {pagination.totalPages}
            </span>

            {pagination.page < pagination.totalPages && (
              <Link
                href={buildPageHref(params, pagination.page + 1)}
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Suivant
              </Link>
            )}
          </nav>
        )}

        {requests.length === 0 && (
          <div className="p-8 text-center text-neutral-500">
            Aucune demande client.
          </div>
        )}
      </div>
    </section>
  );
}
