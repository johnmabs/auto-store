import Link from "next/link";

import { updateCustomerRequestStatus } from "@/features/requests/request.actions";
import { getAdminCustomerRequests } from "@/features/requests/request.queries";
import { getCustomerRequestStatusLabel } from "@/features/requests/request.formatters";

function getStatusLabel(status: "NEW" | "CONTACTED" | "CLOSED") {
  switch (status) {
    case "NEW":
      return "Nouvelle";
    case "CONTACTED":
      return "Contactée";
    case "CLOSED":
      return "Clôturée";
  }
}

export default async function AdminRequestsPage() {
  const requests = await getAdminCustomerRequests();

  return (
    <section>
      <div>
        <h1 className="text-3xl font-bold">Demandes clients</h1>

        <p className="mt-2 text-neutral-600">
          Suivi des demandes reçues depuis le site.
        </p>
      </div>

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
                    {request.status !== "CONTACTED" && (
                      <form
                        action={updateCustomerRequestStatus.bind(
                          null,
                          request.id,
                          "CONTACTED",
                        )}
                      >
                        <button
                          type="submit"
                          className="rounded border px-3 py-1 text-xs"
                        >
                          Marquer contactée
                        </button>
                      </form>
                    )}

                    {request.status !== "CLOSED" && (
                      <form
                        action={updateCustomerRequestStatus.bind(
                          null,
                          request.id,
                          "CLOSED",
                        )}
                      >
                        <button
                          type="submit"
                          className="rounded border px-3 py-1 text-xs"
                        >
                          Clôturer
                        </button>
                      </form>
                    )}

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

        {requests.length === 0 && (
          <div className="p-8 text-center text-neutral-500">
            Aucune demande client.
          </div>
        )}
      </div>
    </section>
  );
}
