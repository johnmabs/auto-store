"use client";

import { useActionState } from "react";

import {
  createCustomerRequest,
  type CustomerRequestState,
} from "./request.actions";

type CustomerRequestFormProps = {
  vehicleId: string;
};

const initialState: CustomerRequestState = {
  success: false,
  message: "",
};

export function CustomerRequestForm({ vehicleId }: CustomerRequestFormProps) {
  const [state, formAction, pending] = useActionState(
    createCustomerRequest,
    initialState,
  );

  if (state.success) {
    return (
      <div className="rounded-xl border bg-green-50 p-5">
        <p className="font-medium text-green-900">Demande envoyée</p>

        <p className="mt-1 text-sm text-green-800">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4 rounded-xl border p-6">
      <input type="hidden" name="vehicleId" value={vehicleId} />

      <div>
        <h2 className="text-xl font-semibold">
          Vous êtes intéressé par ce véhicule ?
        </h2>

        <p className="mt-1 text-sm text-neutral-600">
          Laissez vos coordonnées et nous vous contacterons.
        </p>
      </div>

      <div>
        <label htmlFor="firstName" className="mb-1 block text-sm font-medium">
          Prénom *
        </label>

        <input
          id="firstName"
          name="firstName"
          required
          className="w-full rounded-lg border px-3 py-2"
        />

        {state.errors?.firstName && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.firstName[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lastName" className="mb-1 block text-sm font-medium">
          Nom
        </label>

        <input
          id="lastName"
          name="lastName"
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium">
          Téléphone *
        </label>

        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="w-full rounded-lg border px-3 py-2"
        />

        {state.errors?.phone && (
          <p className="mt-1 text-sm text-red-600">{state.errors.phone[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          className="w-full rounded-lg border px-3 py-2"
        />

        {state.errors?.email && (
          <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Message
        </label>

        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Je souhaite avoir plus d'informations sur ce véhicule."
        />
      </div>

      {state.message && <p className="text-sm text-red-600">{state.message}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-black px-5 py-2.5 text-white disabled:opacity-50"
      >
        {pending ? "Envoi..." : "Envoyer ma demande"}
      </button>
    </form>
  );
}
