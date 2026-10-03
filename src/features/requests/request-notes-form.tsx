"use client";

import { useActionState } from "react";

import {
  updateCustomerRequestNotes,
  type CustomerRequestActionState,
} from "./request.actions";

const initialState: CustomerRequestActionState = {
  success: false,
};

type RequestNotesFormProps = {
  requestId: string;
  initialNotes: string | null;
};

export function RequestNotesForm({
  requestId,
  initialNotes,
}: RequestNotesFormProps) {
  const action = updateCustomerRequestNotes.bind(null, requestId);

  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="rounded-xl border bg-white p-6">
      <label htmlFor="adminNotes" className="font-semibold">
        Notes internes
      </label>

      <p className="mt-1 text-xs text-neutral-500">
        Ces notes ne sont jamais visibles par le client.
      </p>

      <textarea
        id="adminNotes"
        name="adminNotes"
        rows={6}
        defaultValue={initialNotes ?? ""}
        className="mt-4 w-full rounded-lg border px-3 py-2"
        placeholder="Ex. Client appelé, souhaite visiter le véhicule samedi..."
      />

      {state.message && (
        <p
          role="status"
          className={[
            "mt-3 text-sm",
            state.success ? "text-green-700" : "text-red-600",
          ].join(" ")}
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-3 rounded-lg bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
      >
        {pending ? "Enregistrement..." : "Enregistrer les notes"}
      </button>
    </form>
  );
}
