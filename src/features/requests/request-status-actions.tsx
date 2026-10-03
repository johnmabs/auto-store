"use client";

import { useActionState } from "react";

import {
  updateCustomerRequestStatus,
  type CustomerRequestActionState,
} from "./request.actions";

import type { CustomerRequestStatus } from "./request-status";

const initialState: CustomerRequestActionState = {
  success: false,
};

type RequestStatusActionsProps = {
  requestId: string;
  status: CustomerRequestStatus;
};

export function RequestStatusActions({
  requestId,
  status,
}: RequestStatusActionsProps) {
  const contactAction = updateCustomerRequestStatus.bind(
    null,
    requestId,
    "CONTACTED",
  );

  const reopenAction = updateCustomerRequestStatus.bind(null, requestId, "NEW");

  const closeAction = updateCustomerRequestStatus.bind(
    null,
    requestId,
    "CLOSED",
  );

  const [contactState, contactFormAction, contactPending] = useActionState(
    contactAction,
    initialState,
  );

  const [reopenState, reopenFormAction, reopenPending] = useActionState(
    reopenAction,
    initialState,
  );

  const [closeState, closeFormAction, closePending] = useActionState(
    closeAction,
    initialState,
  );

  const feedback =
    contactState.message ?? reopenState.message ?? closeState.message;

  const hasError =
    (contactState.message && !contactState.success) ||
    (reopenState.message && !reopenState.success) ||
    (closeState.message && !closeState.success);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {status === "NEW" && (
          <form action={contactFormAction}>
            <button
              type="submit"
              disabled={contactPending}
              className="rounded border px-3 py-1.5 text-sm disabled:opacity-50"
            >
              {contactPending ? "Mise à jour..." : "Marquer contactée"}
            </button>
          </form>
        )}

        {status === "CONTACTED" && (
          <form action={reopenFormAction}>
            <button
              type="submit"
              disabled={reopenPending}
              className="rounded border px-3 py-1.5 text-sm disabled:opacity-50"
            >
              Repasser en nouvelle
            </button>
          </form>
        )}

        {status === "CLOSED" && (
          <form action={contactFormAction}>
            <button
              type="submit"
              disabled={contactPending}
              className="rounded border px-3 py-1.5 text-sm disabled:opacity-50"
            >
              Réouvrir
            </button>
          </form>
        )}

        {status !== "CLOSED" && (
          <form action={closeFormAction}>
            <button
              type="submit"
              disabled={closePending}
              className="rounded border px-3 py-1.5 text-sm disabled:opacity-50"
            >
              {closePending ? "Clôture..." : "Clôturer"}
            </button>
          </form>
        )}
      </div>

      {feedback && (
        <p
          role="status"
          className={
            hasError ? "text-xs text-red-600" : "text-xs text-green-700"
          }
        >
          {feedback}
        </p>
      )}
    </div>
  );
}
