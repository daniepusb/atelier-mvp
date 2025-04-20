import { describe, expect, it } from "vitest";
import { calculateTotal } from "../calculateTotal";

describe("calculateTotal", () => {
  it("calcula total con tareas", () => {
    const total = calculateTotal(50, [{ price: 10 }, { price: 20 }]);
    expect(total).toBe(80);
  });

  it("funciona sin tareas", () => {
    const total = calculateTotal(30, []);
    expect(total).toBe(30);
  });
});
