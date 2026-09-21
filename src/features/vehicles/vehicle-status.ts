export type VehicleStatus = "DRAFT" | "AVAILABLE" | "RESERVED" | "SOLD";

const allowedTransitions: Record<VehicleStatus, VehicleStatus[]> = {
  DRAFT: ["AVAILABLE"],
  AVAILABLE: ["RESERVED", "SOLD"],
  RESERVED: ["AVAILABLE", "SOLD"],
  SOLD: [],
};

export function canTransitionVehicleStatus(
  currentStatus: VehicleStatus,
  nextStatus: VehicleStatus,
) {
  if (currentStatus === nextStatus) {
    return true;
  }

  return allowedTransitions[currentStatus].includes(nextStatus);
}

export function requiresPublishedVehicle(status: VehicleStatus) {
  return status !== "DRAFT";
}
