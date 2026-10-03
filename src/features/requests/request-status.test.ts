import { describe, expect, test } from "vitest";

import { canTransitionCustomerRequestStatus } from "./request-status";

describe("canTransitionCustomerRequestStatus", () => {
  test("allows NEW to CONTACTED", () => {
    expect(canTransitionCustomerRequestStatus("NEW", "CONTACTED")).toBe(true);
  });

  test("allows NEW to CLOSED", () => {
    expect(canTransitionCustomerRequestStatus("NEW", "CLOSED")).toBe(true);
  });

  test("allows CONTACTED to NEW", () => {
    expect(canTransitionCustomerRequestStatus("CONTACTED", "NEW")).toBe(true);
  });

  test("allows CONTACTED to CLOSED", () => {
    expect(canTransitionCustomerRequestStatus("CONTACTED", "CLOSED")).toBe(
      true,
    );
  });

  test("allows CLOSED to CONTACTED", () => {
    expect(canTransitionCustomerRequestStatus("CLOSED", "CONTACTED")).toBe(
      true,
    );
  });

  test("rejects CLOSED to NEW", () => {
    expect(canTransitionCustomerRequestStatus("CLOSED", "NEW")).toBe(false);
  });

  test("allows keeping the same status", () => {
    expect(canTransitionCustomerRequestStatus("CONTACTED", "CONTACTED")).toBe(
      true,
    );
  });
});
