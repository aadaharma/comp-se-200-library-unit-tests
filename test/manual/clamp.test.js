import clamp from "../../src/clamp.js";

describe("clamp.js", () => {
  // Positive number within bound
  it("should return number when within bounds", () => {
    const result = clamp(5, 1, 10);
    expect(result).toBe(5);
  });

  // Negative number within bound
  it("should return negative number when within bounds", () => {
    const result = clamp(-5, -10, -1);
    expect(result).toBe(-5);
  });

  // Positive floating point number within bound
  it("should return positive float when within bounds", () => {
    const result = clamp(7.5, 1.0, 10.0);
    expect(result).toBe(7.5);
  });

  // Negative floating point number within bound
  it("should return negative float when within bounds", () => {
    const result = clamp(-2.5, -5.0, -1.0);
    expect(result).toBe(-2.5);
  });

  // Zero within bound
  it("should return zero when within bounds", () => {
    const result = clamp(0, -5, 5);
    expect(result).toBe(0);
  });

  // Upper smaller than number
  it("should return upper bound when number exceeds upper", () => {
    const result = clamp(15, 1, 10);
    expect(result).toBe(10);
  });

  // Lower bigger than number
  it("should return lower bound when number below lower", () => {
    const result = clamp(3, 5, 10);
    expect(result).toBe(5);
  });

  // Number equals lower bound
  it("should return lower bound when number equals lower", () => {
    const result = clamp(1, 1, 10);
    expect(result).toBe(1);
  });

  // Number equals upper bound
  it("should return upper bound when number equals upper", () => {
    const result = clamp(10, 1, 10);
    expect(result).toBe(10);
  });

  // Error handling - string
  it("should throw error for string input", () => {
    expect(() => clamp("5", 1, 10)).toThrow();
  });

  // Error handling - array
  it("should throw error for array input", () => {
    expect(() => clamp([5], 1, 10)).toThrow();
  });

  // Error handling - object
  it("should throw error for object input", () => {
    expect(() => clamp({ value: 5 }, 1, 10)).toThrow();
  });

  // Error handling - null
  it("should throw error for null input", () => {
    expect(() => clamp(null, 1, 10)).toThrow();
  });

  // Error handling - lower is not a number
  it("should throw error when lower is not a number", () => {
    expect(() => clamp(5, "low", 10)).toThrow();
  });

  // Error handling - upper is not a number
  it("should throw error when upper is not a number", () => {
    expect(() => clamp(5, 1, "high")).toThrow();
  });
});
