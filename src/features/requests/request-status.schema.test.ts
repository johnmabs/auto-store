import { describe, expect, test } from "vitest";

import { customerRequestStatusActionSchema } from "./request-status.schema";

describe("customerRequestStatusActionSchema", () => {
  test.each(["NEW", "CONTACTED", "CLOSED"] as const)(
    "accepts %s status",
    (status) => {
      const result = customerRequestStatusActionSchema.safeParse({
        requestId: "request-1",
        status,
      });

      expect(result.success).toBe(true);
    },
  );

  test("rejects empty request id", () => {
    const result = customerRequestStatusActionSchema.safeParse({
      requestId: "",
      status: "NEW",
    });

    expect(result.success).toBe(false);
  });

  test("rejects invalid status", () => {
    const result = customerRequestStatusActionSchema.safeParse({
      requestId: "request-1",
      status: "PENDING",
    });

    expect(result.success).toBe(false);
  });
});
