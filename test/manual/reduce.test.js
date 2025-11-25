import { describe, it, expect } from "@jest/globals";
import reduce from "../../src/reduce.js";

describe("reduce.js", () => {
  it("should sum array of integers with initial value", () => {
    const result = reduce([1, 2, 3], (sum, n) => sum + n, 0);
    expect(result).toBe(6);
  });

  it("should sum array with negative numbers", () => {
    const result = reduce([5, -3, 2], (sum, n) => sum + n, 0);
    expect(result).toBe(4);
  });
});
