"use client";

import { useActionState } from "react";

import { updateVehicle, type VehicleFormState } from "./vehicle.actions";

import {
  VehicleFormFields,
  type VehicleFormValues,
} from "./vehicle-form-fields";

const initialState: VehicleFormState = {
  success: false,
};

type EditVehicleFormProps = {
  vehicleId: string;
  values: VehicleFormValues;
};

export function EditVehicleForm({ vehicleId, values }: EditVehicleFormProps) {
  const updateVehicleWithId = updateVehicle.bind(null, vehicleId);

  const [state, formAction, pending] = useActionState(
    updateVehicleWithId,
    initialState,
  );

  return (
    <VehicleFormFields
      action={formAction}
      state={state}
      pending={pending}
      values={values}
      submitLabel="Enregistrer les modifications"
    />
  );
}
