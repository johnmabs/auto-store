import { describe, expect, test } from "vitest";

import {
  canTransitionVehicleStatus,
  requiresPublishedVehicle,
} from "./vehicle-status";

describe("canTransitionVehicleStatus", () => {
  test("allows DRAFT to AVAILABLE", () => {
    expect(canTransitionVehicleStatus("DRAFT", "AVAILABLE")).toBe(true);
  });

  test("rejects DRAFT to SOLD", () => {
    expect(canTransitionVehicleStatus("DRAFT", "SOLD")).toBe(false);
  });

  test("allows AVAILABLE to RESERVED", () => {
    expect(canTransitionVehicleStatus("AVAILABLE", "RESERVED")).toBe(true);
  });

  test("allows AVAILABLE to SOLD", () => {
    expect(canTransitionVehicleStatus("AVAILABLE", "SOLD")).toBe(true);
  });

  test("allows RESERVED to AVAILABLE", () => {
    expect(canTransitionVehicleStatus("RESERVED", "AVAILABLE")).toBe(true);
  });

  test("allows RESERVED to SOLD", () => {
    expect(canTransitionVehicleStatus("RESERVED", "SOLD")).toBe(true);
  });

  test("does not allow SOLD to AVAILABLE", () => {
    expect(canTransitionVehicleStatus("SOLD", "AVAILABLE")).toBe(false);
  });

  test("allows keeping the same status", () => {
    expect(canTransitionVehicleStatus("AVAILABLE", "AVAILABLE")).toBe(true);
  });
});

describe("requiresPublishedVehicle", () => {
  test("DRAFT does not require publication rules", () => {
    expect(requiresPublishedVehicle("DRAFT")).toBe(false);
  });

  test.each(["AVAILABLE", "RESERVED", "SOLD"] as const)(
    "%s requires publication rules",
    (status) => {
      expect(requiresPublishedVehicle(status)).toBe(true);
    },
  );
});
