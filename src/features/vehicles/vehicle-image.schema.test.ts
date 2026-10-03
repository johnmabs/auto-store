import { describe, expect, test } from "vitest";

import {
  vehicleImageActionSchema,
  vehicleImageMoveActionSchema,
} from "./vehicle-image.schema";

describe("vehicleImageActionSchema", () => {
  test("accepts valid ids", () => {
    const result = vehicleImageActionSchema.safeParse({
      vehicleId: "vehicle-1",
      imageId: "image-1",
    });

    expect(result.success).toBe(true);
  });

  test("rejects empty vehicle id", () => {
    const result = vehicleImageActionSchema.safeParse({
      vehicleId: "",
      imageId: "image-1",
    });

    expect(result.success).toBe(false);
  });

  test("rejects empty image id", () => {
    const result = vehicleImageActionSchema.safeParse({
      vehicleId: "vehicle-1",
      imageId: "",
    });

    expect(result.success).toBe(false);
  });
});

describe("vehicleImageMoveActionSchema", () => {
  test.each(["up", "down"] as const)("accepts %s direction", (direction) => {
    const result = vehicleImageMoveActionSchema.safeParse({
      vehicleId: "vehicle-1",
      imageId: "image-1",
      direction,
    });

    expect(result.success).toBe(true);
  });

  test("rejects invalid direction", () => {
    const result = vehicleImageMoveActionSchema.safeParse({
      vehicleId: "vehicle-1",
      imageId: "image-1",
      direction: "left",
    });

    expect(result.success).toBe(false);
  });
});
