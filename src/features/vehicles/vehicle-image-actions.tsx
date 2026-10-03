"use client";

import { useActionState } from "react";

import {
  moveVehicleImage,
  removeVehicleImage,
  setPrimaryVehicleImage,
  type VehicleImageActionState,
} from "./vehicle.actions";

const initialState: VehicleImageActionState = {
  success: false,
};

type VehicleImageActionsProps = {
  vehicleId: string;
  imageId: string;
  isPrimary: boolean;
  isFirst: boolean;
  isLast: boolean;
};

export function VehicleImageActions({
  vehicleId,
  imageId,
  isPrimary,
  isFirst,
  isLast,
}: VehicleImageActionsProps) {
  const setPrimaryAction = setPrimaryVehicleImage.bind(
    null,
    vehicleId,
    imageId,
  );

  const removeAction = removeVehicleImage.bind(null, vehicleId, imageId);

  const moveUpAction = moveVehicleImage.bind(null, vehicleId, imageId, "up");

  const moveDownAction = moveVehicleImage.bind(
    null,
    vehicleId,
    imageId,
    "down",
  );

  const [primaryState, primaryFormAction, primaryPending] = useActionState(
    setPrimaryAction,
    initialState,
  );

  const [removeState, removeFormAction, removePending] = useActionState(
    removeAction,
    initialState,
  );

  const [moveUpState, moveUpFormAction, moveUpPending] = useActionState(
    moveUpAction,
    initialState,
  );

  const [moveDownState, moveDownFormAction, moveDownPending] = useActionState(
    moveDownAction,
    initialState,
  );

  const feedback =
    primaryState.message ??
    removeState.message ??
    moveUpState.message ??
    moveDownState.message;

  const hasError =
    (primaryState.message && !primaryState.success) ||
    (removeState.message && !removeState.success) ||
    (moveUpState.message && !moveUpState.success) ||
    (moveDownState.message && !moveDownState.success);

  return (
    <div className="space-y-3">
      {!isPrimary && (
        <form action={primaryFormAction}>
          <button
            type="submit"
            disabled={primaryPending}
            className="text-sm underline underline-offset-4 disabled:opacity-50"
          >
            {primaryPending ? "Modification..." : "Définir comme principale"}
          </button>
        </form>
      )}

      <div className="flex gap-2">
        <form action={moveUpFormAction}>
          <button
            type="submit"
            disabled={isFirst || moveUpPending}
            className="rounded border px-3 py-1 text-sm disabled:opacity-30"
          >
            ←
          </button>
        </form>

        <form action={moveDownFormAction}>
          <button
            type="submit"
            disabled={isLast || moveDownPending}
            className="rounded border px-3 py-1 text-sm disabled:opacity-30"
          >
            →
          </button>
        </form>

        <form action={removeFormAction}>
          <button
            type="submit"
            disabled={removePending}
            className="rounded border border-red-200 px-3 py-1 text-sm text-red-700 disabled:opacity-50"
          >
            {removePending ? "Suppression..." : "Supprimer"}
          </button>
        </form>
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
