export type CustomerRequestStatus = "NEW" | "CONTACTED" | "CLOSED";

const allowedTransitions: Record<
  CustomerRequestStatus,
  CustomerRequestStatus[]
> = {
  NEW: ["CONTACTED", "CLOSED"],
  CONTACTED: ["NEW", "CLOSED"],
  CLOSED: ["CONTACTED"],
};

export function canTransitionCustomerRequestStatus(
  currentStatus: CustomerRequestStatus,
  nextStatus: CustomerRequestStatus,
) {
  if (currentStatus === nextStatus) {
    return true;
  }

  return allowedTransitions[currentStatus].includes(nextStatus);
}
