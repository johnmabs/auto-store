"use client";

import { useActionState } from "react";

import { createVehicle, type VehicleFormState } from "./vehicle.actions";
import { VehicleFormFields } from "./vehicle-form-fields";

const initialState: VehicleFormState = {
  success: false,
};

export function CreateVehicleForm() {
  const [state, formAction, pending] = useActionState(
    createVehicle,
    initialState,
  );

  return (
    <VehicleFormFields
      action={formAction}
      state={state}
      pending={pending}
      submitLabel="Enregistrer le véhicule"
    />
  );
}
