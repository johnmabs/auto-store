import Link from "next/link";
import { notFound } from "next/navigation";

import { getAdminCustomerRequestById } from "@/features/requests/request.queries";
import { getCustomerRequestStatusLabel } from "@/features/requests/request.formatters";
import { getVehicleLocationLabel } from "@/features/vehicles/vehicle.formatters";
import { RequestStatusActions } from "@/features/requests/request-status-actions";

import { RequestNotesForm } from "@/features/requests/request-notes-form";

type AdminRequestPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminRequestPage({
  params,
}: AdminRequestPageProps) {
  const { id } = await params;

  const request = await getAdminCustomerRequestById(id);

  if (!request) {
    notFound();
  }

  return (
    <section className="max-w-5xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/requests"
            className="text-sm text-neutral-500 underline underline-offset-4"
          >
            ← Retour aux demandes
          </Link>

          <h1 className="mt-3 text-3xl font-bold">
            {request.firstName} {request.lastName ?? ""}
          </h1>

          <p className="mt-2 text-neutral-600">
            Demande reçue le{" "}
            {new Intl.DateTimeFormat("fr-FR", {
              dateStyle: "long",
              timeStyle: "short",
            }).format(request.createdAt)}
          </p>
        </div>

        <div className="rounded-full border px-3 py-1 text-sm">
          {getCustomerRequestStatusLabel(request.status)}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-xl border bg-white p-6">
            <h2 className="font-semibold">Coordonnées</h2>

            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-neutral-500">Téléphone</dt>

                <dd>
                  <a
                    href={`tel:${request.phone}`}
                    className="underline underline-offset-4"
                  >
                    {request.phone}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-neutral-500">Email</dt>

                <dd>
                  {request.email ? (
                    <a
                      href={`mailto:${request.email}`}
                      className="underline underline-offset-4"
                    >
                      {request.email}
                    </a>
                  ) : (
                    "Non renseigné"
                  )}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <h2 className="font-semibold">Message du client</h2>

            <p className="mt-4 whitespace-pre-wrap text-sm text-neutral-700">
              {request.message ?? "Aucun message fourni."}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border bg-white p-6">
            <h2 className="font-semibold">Véhicule concerné</h2>

            {request.vehicle ? (
              <div className="mt-4">
                <p className="text-lg font-medium">
                  {request.vehicle.make} {request.vehicle.model}
                </p>

                <p className="text-sm text-neutral-500">
                  {request.vehicle.year}
                  {request.vehicle.variant
                    ? ` · ${request.vehicle.variant}`
                    : ""}
                </p>

                <dl className="mt-4 space-y-2 text-sm">
                  <div>
                    <dt className="text-neutral-500">Localisation</dt>

                    <dd>
                      {getVehicleLocationLabel(
                        request.vehicle.locationStatus,
                        request.vehicle.congoCity,
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-neutral-500">Prix</dt>

                    <dd>
                      {new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: request.vehicle.currency,
                        maximumFractionDigits: 0,
                      }).format(request.vehicle.price)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/admin/vehicles/${request.vehicle.id}/edit`}
                    className="rounded border px-3 py-2 text-sm"
                  >
                    Modifier le véhicule
                  </Link>

                  <Link
                    href={`/vehicles/${request.vehicle.slug}`}
                    target="_blank"
                    className="rounded border px-3 py-2 text-sm"
                  >
                    Voir la fiche publique
                  </Link>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-neutral-500">Demande générale.</p>
            )}
          </div>

          <div className="rounded-xl border bg-white p-6">
            <h2 className="font-semibold">Suivi</h2>

            <div className="mt-4 flex flex-wrap gap-2">
              <RequestStatusActions
                requestId={request.id}
                status={request.status}
              />
            </div>
          </div>

          <RequestNotesForm
            requestId={request.id}
            initialNotes={request.adminNotes}
          />
        </div>
      </div>
    </section>
  );
}
